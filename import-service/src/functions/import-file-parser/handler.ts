import { S3Event } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { DEFAULT_AWS_S3_REGION } from '@libs/constants';
import { middyfy } from '@libs/lambda';
import { Product } from '../../models/product';
import { csvParserService } from '../../services/csv-parcer';
import { messageService } from '../../services/message';

const importFileParser = async (event: S3Event, context) => {
  console.log('importFileParser::event', event);

  const { BUCKET_REGION: region = DEFAULT_AWS_S3_REGION } = process.env;
  const [firstRecord] = event.Records;
  const uploadedFileKey = firstRecord.s3.object.key;

  try {
    const s3 = new S3({ region });

    const productList = await csvParserService.parse<Product>(
      s3.getObject({
        Bucket: process.env.BUCKET_NAME,
        Key: uploadedFileKey,
      }).createReadStream(),
      (data) => ({
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        price: Number(data.price),
        count: Number(data.count),
      }),
    );
    console.log('importFileParser::productList', productList);

    await messageService.send(productList);

    await moveCSVFileToParsed(s3, uploadedFileKey);
    console.log(`File ${uploadedFileKey} moved into "parsed`);

    console.log(`CSV file "${uploadedFileKey}" has been parsed successfully.`);
    context.succeed();
  } catch(e) {
    console.log(e.message);
    context.fail('Internal server error')
  }
};

const moveCSVFileToParsed = async (s3: S3, uploadedFileKey: string) => {
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
}

export const main = middyfy(importFileParser);
