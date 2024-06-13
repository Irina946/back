import bodyParser from 'body-parser';
import fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import { initUsersController, log } from './conrollers/users/users.controller';
import cors from 'cors';

const server = express();

const isDev = true;
server.use(cors({
  origin: '*',
  credentials: true
}));

server.use(bodyParser.json());


if (isDev) {
  // Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
  server.use(async (req, res, next) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });
    next();
  });
}

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  server.listen(3010, () => {
    log('Server is running on 3010 port')
    console.log('server is running on 3010 port');
  });
  initUsersController(server);
};


// запуск сервера
void main()

