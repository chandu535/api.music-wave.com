import { CategoryModel } from "../models/categories";
import { IGetAllCategoriesPayload } from "../types/categories";

export class CategoriesService {
  async getAllCategories({ page, skip, query }: IGetAllCategoriesPayload) {
    const response = await CategoryModel.find(query)
      .sort({ title: 1 })
      .skip(page)
      .limit(skip);

    return response;
  }
  async getCategoriesCount({ query = {} }: { query: any }) {
    return await CategoryModel.countDocuments(query);
  }
}
