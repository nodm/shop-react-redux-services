import { SQSEvent, SQSRecord } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { Product, ProductDTO } from '../../models/product';
import { emailNotificationService } from '../../services/email-notification';
import { productService } from '../../services/product';

const catalogBatchProcess = async (event: SQSEvent) => {
  console.log('catalogBatchProcess::event', event);

  const productList = event.Records.map((record: SQSRecord) => JSON.parse(record.body));
  const storedProductList = await storeProducts(productList);

  await sendEmail(storedProductList);
};

const storeProducts = async (productList: Product[]): Promise<ProductDTO[]> => {
  const results = await Promise.allSettled(
    productList.map((product) => productService.addProduct(product))
  );

  return results
    .filter(({ status, reason  }, index) => {
      if (status === 'fulfilled') return true;

      console.log(`Error on adding product "${productList[index].title}"`, reason?.message);
      return false;
    })
    .map(({ value }) => value as ProductDTO);
};

const sendEmail = async (productList: ProductDTO[]) => Promise.all(productList.map(async (product) => {
  await emailNotificationService.send(product);
  console.log('Email is sent', JSON.stringify(product, null, 2));
}));

export const main = middyfy(catalogBatchProcess);
