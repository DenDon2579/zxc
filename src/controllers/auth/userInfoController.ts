import { Request, Response } from 'express';
import UserService from '../../services/UserService';
import { HTTP_CODES, SETTINGS } from '../../settings';
import jwt from 'jsonwebtoken';
import UserRepository from '../../data/repos/users/UserRepository';
import UserQueryRepository from '../../data/repos/users/UserQueryRepository';

export default async (req: Request, res: Response) => {
  console.log(req.userId);
  if (req.userId) {
    const result = await UserQueryRepository.getShortInfoById(req.userId);
    if (result) {
      res.status(200).json(result);
      return;
    }
    res.sendStatus(404);
    return;
  }
  res.sendStatus(400);
};
