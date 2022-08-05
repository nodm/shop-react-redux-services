import { Product, ProductDTO } from '../models/product';
import { ProductRepository, productRepository } from '../repositories';

class ProductService {
  constructor(private repository: ProductRepository = productRepository) {
  }

  async addProduct(product: Product): Promise<ProductDTO> {
    return this.repository.addProduct(product);
  }
}

export const productService = new ProductService();
