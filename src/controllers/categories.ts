import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../services/categories";

const categoryService = new CategoriesService();
export class CategoriesController {
  public async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await categoryService.getAllCategories();
      res.status(200).json(response);
    } catch (err) {
      console.log({ err });
    }
  }
}
