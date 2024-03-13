import { CategoryModel } from "../models/categories";

export class CategoriesService {
  async getAllCategories() {
    const response = await CategoryModel.find({});

    return response;
  }
}
