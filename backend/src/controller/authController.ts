import { sign } from 'jsonwebtoken';

import config from '../config';
import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

export class AuthenticationController {
  private readonly _router: Router = Router();

  constructor(
    private authMiddleware: AuthMiddleware
  ) {
    this._router.post(
      '/login',
      this.authMiddleware.checkUserAndPassword,
      async (req, res) => {
        const token = sign({ id: req.user.userID! }, config.jwt.secret!, {
          expiresIn: config.jwt.expiryTime,
        });

        res.json({
          auth_token: token,
          user: req.user,
        });

        this._router.get('/logged-view',
        this.authMiddleware.authenticateJWT,
        async (req,res) => {
          res.json({message:'OK',isLogged:true})
        }
        )
      }
    );
  };

  

  get router(): Router {
    return this._router;
  };
};
