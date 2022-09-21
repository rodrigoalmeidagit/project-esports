import {PrismaClient} from '@prisma/client';
import express from 'express';

const app = express();
const prisma = new PrismaClient({
  log: ['query'],
});

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
      };
    })
  );
});

app.get('/ads', (request, response) => {
  return response.json([]);
});

app.get('/games/:id/discord', (request, response) => {
  // const adsId = request.params.id
  return response.status(201).json([]);
});

app.post('/ads', (request, response) => {
  return response.status(201).json([]);
});

app.listen(3333);
