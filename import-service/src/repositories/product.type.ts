import { Product, ProductDTO } from '../models/product';

export interface ProductRepository {
  addProduct: (product: Product) => Promise<ProductDTO>;
}
