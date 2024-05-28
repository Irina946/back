import bodyParser from 'body-parser';
import fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import { createUser, deleteUserByEmail, readUserByEmail, updateUserByEmail } from './conrollers/users/user.service';
import { initUsersController } from './conrollers/users/users.controller';

const server = express();

const isDev = true;

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
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  server.listen(3010, () => {
    console.log('server is running on 3010 port');
  });
  initUsersController(server);

  // await createUser({
    // passwordHash: 'jvlqqowdiornfovm',
    // photoBase64: 'getImageData()',
    // coverBase64: 'ImageData()',
    // name: 'Ivan Ivanov',
    // email: 'mail@mail.com',
    // location: 'Moscow',
    // dateBirthday: '22.05.1998',
    // activity: ['Model', 'Photo'],
    // specialization: ['Stret', 'children', 'food'],
    // price: 5000,
    // sex: 'man',
    // experience: '1-3',
    // aboutMe: 'My name is....',
    // picturesBase64: ['number1']
  // })

  // await deleteUserByEmail('mail@mail.com')
  await updateUserByEmail('mail@mail.com', {name: 'Base'})

  // console.log(await readUserByEmail('mail@mail.com'))
};


// запуск сервера
void main()



function logAction(action: string, data: object): void {
  console.log('––––––======––––––');
  console.log(`${action}:`);
  console.log(data);
  console.log('––––––======––––––');
}
