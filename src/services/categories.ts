import { CategoryModel } from "../models/categories";
import { IGetAllCategoriesPayload } from "../types/categories";

export class CategoriesService {
  async getAllCategories({ page, skip }: IGetAllCategoriesPayload) {
    const response = await CategoryModel.find().skip(page).limit(skip);

    return response;
  }
  async getCategoriesCount() {
    return await CategoryModel.countDocuments();
  }
}
