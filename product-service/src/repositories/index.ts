import { ProductPg } from './product-pg';
import { ProductRepository } from './product.type';

export { ProductRepository} from './product.type';

export const productRepository: ProductRepository = new ProductPg();
