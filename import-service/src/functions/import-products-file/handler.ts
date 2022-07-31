import { S3 } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { DEFAULT_AWS_S3_REGION, DEFAULT_SIGNED_URL_EXPIRATION_TIME_SEC } from '@libs/constants';
import { middyfy } from '@libs/lambda';

const importProductsFile = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('importProductsFile::event', event);

  const { name } = event.queryStringParameters;
  const { BUCKET_REGION: region = DEFAULT_AWS_S3_REGION } = process.env;
  const { SIGNED_URL_EXPIRATION_TIME_SEC: linkExpirationTimeStr } = process.env;
  const linkExpirationTime = Number(linkExpirationTimeStr) || DEFAULT_SIGNED_URL_EXPIRATION_TIME_SEC;

  try {
    const s3 = new S3({ region });
    const signedUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: process.env.BUCKET_NAME,
      Key: `uploaded/${name}`,
      Expires: linkExpirationTime,
      ContentType: 'text/csv',
    });

    return formatJSONResponse({ signedUrl });
  } catch(e) {
    return formatJSONResponse(
      {
        message: 'Internal server error',
        details: e.message,
      },
      500
    );
  }
};

export const main = middyfy(importProductsFile);
