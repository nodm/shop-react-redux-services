import { CreateProductDTO, ProductDTO } from '@models/product';

export interface ProductRepository {
  addProduct: (product: CreateProductDTO) => Promise<ProductDTO>;
  getProductList: () => Promise<ProductDTO[]>;
  getProductById: (productId: string) => Promise<ProductDTO>;
}
