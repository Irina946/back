import bodyParser from 'body-parser';
import fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import { createUser, deleteUserByEmail, readUserByEmail, updateUserByEmail } from './conrollers/users/user.service';
import { initUsersController } from './conrollers/users/users.controller';
import cors from 'cors';
import util from 'util'

const server = express();

const isDev = true;
server.use(cors())
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

const CACERT = '/home/user/.mongodb/root.crt'
const DB_HOSTS = [
  'rc1a-seq8vignz5jes2n9.mdb.yandexcloud.net:27018'
]

const DB_USER = 'user1'
const DB_PASS = 'user1user1'


const url = util.format('mongodb://%s:%s@%s/', DB_USER, DB_PASS, DB_HOSTS.join(','))

const DBurl = 'mongodb://user:user1user1@rc1a-seq8vignz5jes2n9.mdb.yandexcloud.net:27018/db1'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsCAFile: CACERT,
  authSource: 'test'
}

async function main() {
  await mongoose.connect(url, options);
  server.listen(3010, () => {
    console.log('server is running on 3010 port');
  });
  initUsersController(server);
};


// запуск сервера
void main()

