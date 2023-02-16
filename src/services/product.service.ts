import { Product } from "../models/product";
import { IProduct } from "../utils/product.interface";

class ProductService {
  private product = Product;

  async createProduct(payload: IProduct) {
    return this.product.create(payload);
  }

  async getProducts(skip: any, limit: string | null) {
    return this.product.find().skip(Number(skip)).limit(Number(limit));
  }

  async getAProduct(id: string) {
    return this.product.findById(id);
  }

  async updateProduct(id: string, payload: IProduct) {
    return this.product.findOneAndUpdate(
      { _id: id },
      {
        $set: payload,
      },
      {
        new: true,
      }
    );
  }

  async deleteProduct(id: string) {
    return this.product.deleteOne({ _id: id });
  }

  async getProductByName(name: string) {
    return await this.product.findOne({ name });
  }

  async countProducts() {
    return this.product.count();
  }
}

export default ProductService;
