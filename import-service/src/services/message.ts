import { SQS } from 'aws-sdk';
import { Product } from '../models/product';

class MessageService {
  private readonly sqs = new SQS();

  public async send(productList: Product[]) {
    const messageSendResults = await Promise.allSettled(
      productList.map((product: Product) => this.sqs.sendMessage({
        QueueUrl: process.env.SQS_QUEUE_URL,
        MessageBody: JSON.stringify(product),
      }).promise())
    );

    // @ts-ignore
    messageSendResults.forEach(({ status, reason }, i) => {
      if (status === 'fulfilled') {
        console.log(`Message on "${productList[i].title}" was sent successfully.`);
      } else {
        console.log(`Error while sending message "${productList[i].title}".`, reason);
      }
    })
  };

}

export const messageService = new MessageService();
