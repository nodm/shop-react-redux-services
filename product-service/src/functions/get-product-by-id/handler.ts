import { APIGatewayProxyResult } from 'aws-lambda';

import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductService } from '@services/product';

const getProductById = async (event): Promise<APIGatewayProxyResult> => {
  console.log('Lambda getProductById::event', event);

  const productId = event.pathParameters.id;

  try {
    const productService = new ProductService();
    const product = await productService.getProductById(productId);
    if (!product) {
      return formatJSONResponse(
        { message: `Product with ID="${productId}" is not found.` },
        404
      );
    }

    return formatJSONResponse({ product });
  } catch(e) {
    return formatJSONResponse(
      { message: 'Internal server error' },
      500
    );
  }
};

export const main = middyfy(getProductById);
