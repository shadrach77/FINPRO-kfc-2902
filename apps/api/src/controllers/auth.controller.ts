import { AuthService } from '@/services/auth.service';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.login(req);
      return res.status(200).json({ message: 'login success', data });
    } catch (err) {
      next(err);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.register(req);
      return res
        .status(201)
        .json({ message: 'register success', success: true });
    } catch (err) {
      next(err);
    }
  }
}
