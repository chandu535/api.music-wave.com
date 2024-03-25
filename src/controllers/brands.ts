import { IGetAllCategoriesPayload } from "../types/categories";
import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../services/categories";
import { BrandsService } from "../services/brands";

const brandsService = new BrandsService();
export class BrandsController {
  public async getAllBrands(req: Request, res: Response, next: NextFunction) {
    try {
      let { page = 1, limit = 20, search_string, get_all = false } = req.query;
      const pageNumber = parseInt(page as string, 10) || 1;
      const limitNumber = parseInt(limit as string, 10) || 10;
      const getAll = get_all == "true" ? true : false;
      const skip = (pageNumber - 1) * limitNumber;

      const query: any = {};

      if (search_string) {
        query.title = { $regex: search_string, $options: "i" };
      }
      const data = await brandsService.getAllBrands({
        query: query,
        page: skip,
        skip: limitNumber,
        get_all: getAll,
      });

      const categoriesCount = await brandsService.getCategoriesCount({
        query,
      });

      return res.status(200).json({
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
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    }
  }
}
