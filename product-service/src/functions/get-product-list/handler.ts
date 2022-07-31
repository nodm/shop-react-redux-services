import { APIGatewayProxyResult } from 'aws-lambda';

import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductService } from '@services/product';

const getProductList = async (event): Promise<APIGatewayProxyResult> => {
  console.log('Lambda getProductList::event', event);

  try {
    const productService = new ProductService();
    const products = await productService.getProducts();

    return formatJSONResponse({ count: products.length, products });
  } catch(e) {
    return formatJSONResponse(
      { message: 'Internal server error' },
      500
    );
  }
};

export const main = middyfy(getProductList);
