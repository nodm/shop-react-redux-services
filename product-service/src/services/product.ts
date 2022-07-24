import { Product } from '@models/product';
import { PRODUCTS } from './product-data';

export class ProductService {
  constructor() {}

  async getProducts(): Promise<Product[]> {
    return PRODUCTS;
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return PRODUCTS.find((product) => product.id === id);
  }
}
