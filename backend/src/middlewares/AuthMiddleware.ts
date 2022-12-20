import { compareSync } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import config from '../config';

import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../service';
import { User } from '../db';

declare global {
  namespace Express {
    export interface Request {
      user: User;
      id: number;
    }
  }
}

interface JwtPayload {
  id: string;
}

export class AuthMiddleware {
  constructor(private userService: IUserService) { }
  checkUserAndPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (await this.userService.getUserByUserName(req.body.userName))[0];

    if (user === undefined) {
      res.status(200).json({
        error: 'Provided credentials are not valid!',
      });
      return;
    }

    const isValidPassword = compareSync(req.body.password, user.password!);

    if (!isValidPassword) {
      res.status(200).json({
        error: 'Provided credentials are not valid!',
      });
      return;
    }

    req.user = user;
    next();
  };

  authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader === undefined) {
      res.status(401).json({
        error: 'Only accessible by registered users!',
      });
      return;
    }

    if (authHeader?.split(' ')[0] != 'Bearer') {
      res.status(401).json({
        error: 'Token is not valid',
      });
      return;
    }

    const token = authHeader?.split(' ')[1];

    try {
      const decoded = verify(token, config.jwt.secret!) as JwtPayload;
      req.id = Number.parseInt(decoded.id, 10);
    } catch (err) {
      res.status(401).json({
        error: 'Token is not valid',
      });
      return;
    }

    next();
  };
};
