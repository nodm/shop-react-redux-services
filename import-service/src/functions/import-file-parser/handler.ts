import { S3Event } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import csvParser from 'csv-parser';
import { formatJSONResponse } from '@libs/api-gateway';
import { DEFAULT_AWS_S3_REGION } from '@libs/constants';
import { middyfy } from '@libs/lambda';

const importFileParser = async (event: S3Event) => {
  console.log('importFileParser::event', event);

  const { BUCKET_REGION: region = DEFAULT_AWS_S3_REGION } = process.env;
  const [firstRecord] = event.Records;
  const uploadedFileKey = firstRecord.s3.object.key;

  try {
    const s3 = new S3({ region });

    const productList = await new Promise((resolve, reject) => {
      const content = [];

      s3.getObject({
        Bucket: process.env.BUCKET_NAME,
        Key: uploadedFileKey,
      })
        .createReadStream()
        .pipe(csvParser())
        .on('data', (data) => {
          content.push(data);
        })
        .on('end', () => {
          resolve(content);
        })
        .on('error', (err) => {
          reject(err);
        });
    });

    console.log('importFileParser::productList', productList);

    await s3
      .copyObject({
        Bucket: process.env.BUCKET_NAME,
        CopySource: `${process.env.BUCKET_NAME}/${uploadedFileKey}`,
        Key: uploadedFileKey.replace('uploaded', 'parsed')
      })
      .promise();

    await s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: uploadedFileKey,
      })
      .promise();

    console.log(`File ${uploadedFileKey} moved into "parsed`);

    return formatJSONResponse({
      message: `CSV file "${uploadedFileKey}" has been parsed successfully.`,
    });
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

export const main = middyfy(importFileParser);
