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
      let { page = 1, limit = 20, search_string } = req.query;
      const pageNumber = parseInt(page as string, 10) || 1;
      const limitNumber = parseInt(limit as string, 10) || 10;
      const skip = (pageNumber - 1) * limitNumber;

      const query: any = {};

      if (search_string) {
        query.title = { $regex: search_string, $options: "i" };
      }
      const data = await categoryService.getAllCategories({
        query: query,
        page: skip,
        skip: limitNumber,
      });

      const categoriesCount = await categoryService.getCategoriesCount({
        query,
      });

      res.status(200).json({
        message: "Categories Fetch successfully",
        page: pageNumber,
        limit: limitNumber,
        total: categoriesCount,
        total_pages: Math.ceil(categoriesCount / limitNumber),
        has_more: categoriesCount > pageNumber * limitNumber,
        search_string: search_string,
        data: data,
      });
    } catch (err) {
      console.log({ err });
    }
  }
}
