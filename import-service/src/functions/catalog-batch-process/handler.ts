import { SQSEvent, SQSRecord } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { Product, ProductDTO } from '../../models/product';
import { emailNotificationService } from '../../services/email-notification';
import { productService } from '../../services/product';

const catalogBatchProcess = async (event: SQSEvent) => {
  console.log('importFileParser::event', event);

  const productList = event.Records.map((record: SQSRecord) => JSON.parse(record.body));

  await storeProducts(productList);

  await sendEmail(productList);
};

const storeProducts = async (productList: Product[]): Promise<ProductDTO[]> => {
  const results = await Promise
    .allSettled(productList.map((product) => productService.addProduct(product)));

  return results
    .filter(({status, reason  }, index) => {
      if (status === 'fulfilled') return true;

      console.log(`Error on adding product "${productList[index].title}"`, reason?.message);
      return false;
    })
    .map(({ data }) => data as ProductDTO);
};

const sendEmail = async (productList: Product[]) => {
  await emailNotificationService.send(productList);
  console.log('Email is sent', JSON.stringify(productList, null, 2));
};

export const main = middyfy(catalogBatchProcess);
