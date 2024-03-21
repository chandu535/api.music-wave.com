import { BrandsModel } from "../models/brands";
import { IGetAllBrandsPayload } from "../types/brands";

export class BrandsService {
  async getAllBrands({
    page,
    skip,
    query,
    get_all = false,
  }: IGetAllBrandsPayload) {
    if (get_all) {
      console.log("hitter");

      return await BrandsModel.find(query).sort({ title: 1 });
    }
    return await BrandsModel.find(query)
      .sort({ title: 1 })
      .skip(page)
      .limit(skip);
  }
  async getCategoriesCount({ query = {} }: { query: any }) {
    return await BrandsModel.countDocuments(query);
  }
}
