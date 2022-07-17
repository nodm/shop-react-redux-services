import { APIGatewayProxyResult } from 'aws-lambda';

import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductService } from '@services/product';

const getProductList = async (): Promise<APIGatewayProxyResult> => {
  const productService = new ProductService();
  const products = await productService.getProducts();

  return formatJSONResponse({ count: products.length, products });
};

export const main = middyfy(getProductList);
