import { SNS } from 'aws-sdk';
import { ProductDTO } from '../models/product';

class EmailNotificationService {
  private readonly sns = new SNS();

  public async send(product: ProductDTO): Promise<void> {
    await this.sns.publish({
        TopicArn: process.env.SNS_ARN,
        Subject: `Price and count alert: "${product.title}"`,
        Message: JSON.stringify(product),
        MessageAttributes: {
          price: {
            DataType: 'Number',
            StringValue: product.price.toString(),
          },
          count: {
            DataType: 'Number',
            StringValue: product.count.toString(),
          },
        },
      },
    ).promise();
  }
}

export const emailNotificationService = new EmailNotificationService();
