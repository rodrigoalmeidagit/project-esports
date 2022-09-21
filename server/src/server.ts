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

app.get('/games/:id/ads', (request, response) => {
  // const gameId = request.params.id

  return response.json([
    {id: 1, name: 'Anúncio 1'},
    {id: 2, name: 'Anúncio 2'},
    {id: 3, name: 'Anúncio 3'},
    {id: 4, name: 'Anúncio 4'},
    {id: 5, name: 'Anúncio 5'},
    {id: 6, name: 'Anúncio 6'},
  ]);
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
