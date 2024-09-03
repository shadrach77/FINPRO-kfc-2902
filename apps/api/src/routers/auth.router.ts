import { AuthController } from '@/controllers/auth.controller';
import uploadFile from '@/lib/uploader';
import { validateData } from '@/middlewares/validationMiddleware';
import { loginSchema, registerSchema } from '@/schemas/auth.schema';
import { Router } from 'express';

export class AuthRouter {
  private router = Router();
  private authController = new AuthController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post(
      '/v1',
      validateData(loginSchema),
      this.authController.login,
    );
    this.router.post(
      '/v2',

      uploadFile('AVATAR', 'avatars').single('image'),
      validateData(registerSchema),
      this.authController.register,
    );
  }
  public getRouter() {
    return this.router;
  }
}
