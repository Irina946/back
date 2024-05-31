import type { Express } from 'express';
import mongoose, { mongo } from 'mongoose';
import * as path from 'node:path';
import fs from 'fs';
import { createUser, deleteUserByEmail, readUserByEmail, updateUserByEmail } from './user.service';

export function initUsersController(server: Express) {
  server.post('/api/user', async (req, res) => {
    try {
      const { email } = req.body;

      // Поиск пользователя
      const userFromBd = await readUserByEmail(email)


      if (userFromBd != null) {
        return res.json(userFromBd);
      }

      return res.status(403).json({ message: 'User not found' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  });

  server.post('/api/createUser', async (req, res, next) => {
    try {
      const isCreateSucces = await createUser(req.body)
      if (!isCreateSucces) {
        return res.status(403).json({ message: 'Already exsist' });
      }
      // создание пользователя

      return res.sendStatus(200)
    } catch (e) {
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
        return res.sendStatus(200)
      }

      return res.status(403).json({ message: 'User not found' });
    } catch (e) {
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
        return res.sendStatus(200)
      }

      return res.status(403).json({ message: 'User not found' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  });

}


