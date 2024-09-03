import { ProductController } from '@/controllers/product.controller';
import { Router } from 'express';

export class ProductRouter {
  private router = Router();
  private productController = new ProductController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.get('/', this.productController.get);
    this.router.post('/', this.productController.create);
  }
  public getRouter() {
    return this.router;
  }
}
