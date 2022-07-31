import { APIGatewayProxyResult } from 'aws-lambda';

import { ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductService } from '@services/product';
import schema from './schema';
import { validateReqBody } from './validators';

const addProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
): Promise<APIGatewayProxyResult> => {
  console.log('Lambda addProduct::event', event);

  const errors = validateReqBody(event.body);
  if (errors) {
    return formatJSONResponse(errors, 400);
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
