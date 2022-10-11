import {PrismaClient} from '@prisma/client';
import cors from 'cors';
import express from 'express';

import {convertHoursStringToMinutes} from './utils/convert-hours-string-to-minutes';
import {convertMinutesToHourString} from './utils/convert-minutes-to-hour-string';

const app = express();
const prisma = new PrismaClient({
  log: ['query'],
});

app.use(express.json());
app.use(cors());


// TODO: Verificar erro ads.
app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json(games);
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.json({
    discord: ad.discord,
  });
});

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHoursStringToMinutes(body.hourStart),
      hourEnd: convertHoursStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(ad);
});

app.listen(3333);

// HTTP METHODS - API RESTFUL //
// GET - LEITURA/BUSCAR ALGO
// POST - CRIANDO NOVO
// PUT - EDITAR A MAIORIA DOS DADOS
// PATCH - EDITAR DADO ESPECÍFICO
// DELETE - DELETAR ENTIDADE

// HTTP CODES //
// 200, 300, 400, 500

// PARAMETERS TYPES (PERSISTIR ESTADO ATUAL DA PÁGINA - FILTRO, ORDENAÇÃO, ETC)
// QUERY PARAMS(NOMEADOS): exp: localhost:3333/ads?page=2&source=title
// ROUTE PARAMS(NÃO NOMEADOS): exp: localhost:3333/ads/como-criar-um-game
// BODY PARAMS(VARIAS INFOS NA REQUISIÇÃO): exp: formulário
