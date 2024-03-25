import { Request, Response } from "express";

export class ProductsController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const { page, limit, min_price, max_price } = req.query;

      const query: any = {
        status: "ACTIVE",
      };
      if (min_price && max_price) {
        query.sale_price = {
          $gte: min_price,
          $lte: max_price,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
