import { ProductDTO } from '@models/product';

import { ProductRepository, productRepository } from '@repositories/index';

export class ProductService {
  constructor(private repository: ProductRepository = productRepository) {
  }

  async getProducts(): Promise<ProductDTO[]> {
    return this.repository.getProductList();
  }

  async getProductById(id: string): Promise<ProductDTO | undefined> {
    return this.repository.getProductById(id);
  }
}
