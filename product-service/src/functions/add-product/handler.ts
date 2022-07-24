import { APIGatewayProxyResult } from 'aws-lambda';

import { ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductService } from '@services/product';
import schema from './schema';

const addProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
): Promise<APIGatewayProxyResult> => {
  console.log('Lambda addProduct::event', event);

  if (!event.body) {
    return formatJSONResponse(
      { message: 'Product data should be provided in the body.' },
      400
    );
  }

  try {
    const productService = new ProductService();
    const product = await productService.addProduct(event.body);

    return formatJSONResponse({ product }, 201);
  } catch(e) {
    return formatJSONResponse(
      { message: 'Internal server error' },
      500
    );
  }
};

export const main = middyfy(addProduct);
