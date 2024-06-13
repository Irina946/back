import type { Express } from 'express';
import mongoose, { mongo } from 'mongoose';
import * as path from 'node:path';
import fs from 'fs';
import { createUser, deleteUserByEmail, readAllUser, readUserByEmail, updateUserByEmail } from './user.service';

const logFile = 'log.txt';

// Функция для записи логов в файл
export function log(message: string) {
  fs.appendFile(logFile, `${message}\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

export function initUsersController(server: Express) {
  server.post('/api/user', async (req, res) => {
    try {
      const { email } = req.body;

      // Поиск пользователя
      const userFromBd = await readUserByEmail(email)


      if (userFromBd != null) {
        log(`User found: ${email}`);
        return res.json(userFromBd);
      }
      log(`User not found: ${email}`);
      return res.status(403).json({ message: 'User not found' });
    } catch (e) {
      console.log(e);
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  });

  server.post('/api/createUser', async (req, res, next) => {
    try {
      const isCreateSucces = await createUser(req.body)
      if (!isCreateSucces) {
        log(`User already exists: ${req.body.email}`);
        return res.status(403).json({ message: 'Already exsist' });
      }
      // создание пользователя
      log(`User created: ${req.body.email}`);
      return res.sendStatus(200)
    } catch (e) {
      log(`Error: ${e.message}`);
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  });


  server.post('/api/deleteUser', async (req, res) => {
    try {
      const { email } = req.body;

      // Удаление пользователя
      const userFromBd = await readUserByEmail(email)


      if (userFromBd != null) {
        deleteUserByEmail(email)
        log(`User deleted: ${email}`);
        return res.sendStatus(200)
      }

      log(`User not found: ${email}`);
      return res.status(403).json({ message: 'User not found' });
    } catch (e) {
      log(`Error: ${e.message}`);
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  });

  server.post('/api/updateUser', async (req, res) => {
    try {
      const { email } = req.body;

      // Обновление пользователя
      const userFromBd = await readUserByEmail(email)


      if (userFromBd != null) {
        updateUserByEmail(email, req.body)
        log(`User updated: ${email}`);
        return res.sendStatus(200)
      }

      log(`User not found: ${email}`);
      return res.status(403).json({ message: 'User not found' });
    } catch (e) {
      log(`Error: ${e.message}`);
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  });

  server.post('/api/userAll', async (req, res) => {
    try {
      // Поиск всех пользователей
      const userFromBd = await readAllUser()


      if (userFromBd != null) {
        log(`Users found`);
        return res.json(userFromBd);
      }

      log(`Users not found`);
      return res.status(403).json({ message: 'Users not found' });
    } catch (e) {
      log(`Error: ${e.message}`);
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  });
}


