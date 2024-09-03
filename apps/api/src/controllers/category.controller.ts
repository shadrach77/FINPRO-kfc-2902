import { CategoryService } from '@/services/category.service';
import { NextFunction, Request, Response } from 'express';

export class CategoryController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.getAllService();

      return res.status(200).json({ message: 'get success', data });
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await CategoryService.createService(req);
    return res.status(200).json({ message: 'create success' });
  }
}
