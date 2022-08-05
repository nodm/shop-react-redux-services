import { SNS } from 'aws-sdk';
import { Product } from '../models/product';

class EmailNotificationService {
  private readonly sns = new SNS();

  public async send(productList: Product[]): Promise<void> {
    await this.sns.publish({
      Subject: `${productList.length} products are added to the shop.`,
      Message: JSON.stringify(productList),
      TopicArn: process.env.SNS_ARN,
    }).promise();
  }
}

export const emailNotificationService = new EmailNotificationService();
