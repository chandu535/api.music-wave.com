import { IGetAllCategoriesPayload } from "./../types/categories";
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
      let { page = 1, limit = 20 } = req.query;
      const pageNumber = parseInt(page as string, 10) || 1;
      const limitNumber = parseInt(limit as string, 10) || 10;
      const skip = (pageNumber - 1) * limitNumber;

      const data = await categoryService.getAllCategories({
        page: pageNumber,
        skip: skip,
      });

      const categoriesCount = await categoryService.getCategoriesCount();

      res.status(200).json({
        message: "Categories Fetch successfully",
        page: pageNumber,
        limit: limitNumber,
        total: categoriesCount,
        total_pages: Math.ceil(categoriesCount / limitNumber),
        has_more: categoriesCount > pageNumber * limitNumber,
        data: data,
      });
    } catch (err) {
      console.log({ err });
    }
  }
}
