import { ProductDTO } from '@models/product';

export interface ProductRepository {
  getProductList: () => Promise<ProductDTO[]>;
  getProductById: (productId: string) => Promise<ProductDTO>;
}
