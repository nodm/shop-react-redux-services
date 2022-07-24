import { APIGatewayProxyResult } from 'aws-lambda';

import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductService } from '@services/product';

const getProductById = async (event): Promise<APIGatewayProxyResult> => {
  const productId = event.pathParameters.id;

  const productService = new ProductService();
  const product = await productService.getProductById(productId);
  if (!product) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: `Product with ID="${productId}" is not found.` })
    };
  }

  return formatJSONResponse({ product });
};

export const main = middyfy(getProductById);
