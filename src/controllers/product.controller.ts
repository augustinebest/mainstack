import { Request, Response, Router } from "express";
import Controller from "../utils/controller.interface";
import ProductService from "../services/product.service";
import { HttpFailure, HttpSuccess } from "../utils/http.response";
import { IProduct } from "../utils/product.interface";

interface IResult {
  message: string;
  data: {
    response: IProduct[];
    count: number;
    total: number;
  };
}

class ProductController implements Controller {
  public path: string = "/product";
  public router = Router();
  private productService = new ProductService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}/`, this.createProduct);
    this.router.get(`${this.path}/`, this.getProducts);
    this.router.get(`${this.path}/:id`, this.getAProduct);
    this.router.put(`${this.path}/:id`, this.updateProduct);
    this.router.delete(`${this.path}/:id`, this.deleteProduct);
  }

  private createProduct = async (req: Request, res: Response) => {
    try {
      const payload: IProduct = req.body;
      const product = await this.productService.getProductByName(payload.name);
      if (product) {
        return HttpSuccess(res, "Product name already exist!", null, 401);
      }
      const response = await this.productService.createProduct(payload);
      return HttpSuccess(res, "Product created successfully!", response, 200);
    } catch (error: any) {
      throw HttpFailure(res, error.message, 400);
    }
  };

  private getProducts = async (
    req: Request,
    res: Response
  ): Promise<Response<IResult>> => {
    try {
      let { skip, limit }: any = req.query;
      if (!skip || !limit) {
        skip = 0;
        limit = 10;
      }
      const response = await this.productService.getProducts(skip, limit);
      const total = await this.productService.countProducts();
      return HttpSuccess(
        res,
        "Product fetched successfully!",
        { response, count: response.length, total },
        200
      );
    } catch (error: any) {
      throw HttpFailure(res, error.message, 400);
    }
  };

  private getAProduct = async (
    req: Request,
    res: Response
  ): Promise<Response<{ message: string; data: IProduct | null }>> => {
    try {
      const id: string = req.params.id;
      const response = await this.productService.getAProduct(id);
      if (!response) {
        return HttpSuccess(res, "Product not found!", null, 404);
      }
      return HttpSuccess(res, "Product fetched successfully!", response, 200);
    } catch (error: any) {
      return HttpFailure(res, error.message, 400);
    }
  };

  private updateProduct = async (
    req: Request,
    res: Response
  ): Promise<Response<{ message: string; data: IProduct | null }>> => {
    try {
      const id: string = req.params.id;
      const payload: IProduct = req.body;
      const product = await this.productService.getAProduct(id);
      if (!product) {
        return HttpSuccess(res, "Product not found!", null, 404);
      }
      const response = await this.productService.updateProduct(id, payload);
      return HttpSuccess(res, "Product Updated successfully!", response, 200);
    } catch (error: any) {
      return HttpFailure(res, error.message, 400);
    }
  };

  private deleteProduct = async (
    req: Request,
    res: Response
  ): Promise<Response<{ message: string; data: null }>> => {
    try {
      const id: string = req.params.id;
      const product = await this.productService.getAProduct(id);
      if (!product) {
        return HttpSuccess(res, "Product not found!", null, 404);
      }
      await this.productService.deleteProduct(id);
      return HttpSuccess(res, "Product Deleted successfully!", null, 200);
    } catch (error: any) {
      return HttpFailure(res, error.message, 400);
    }
  };
}

export default ProductController;
