import { Client, ClientConfig } from 'pg';

import { ProductDTO } from '@models/product';
import { ProductRepository } from './product.type';

export class ProductPg implements ProductRepository {
  private pgClient: Client;

  public async getProductList(): Promise<ProductDTO[]> {
    const query = `
      SELECT a.id, a.title, a.description, a.image_url, a.price, b.count
        FROM public.products AS a
        INNER JOIN public.stocks AS b ON a.id=b.id`;

    return await this.queryData(query);
  }

  public async getProductById(productId: string): Promise<ProductDTO> {
    const query = `
      SELECT a.id, a.title, a.description, a.image_url, a.price, b.count
        FROM public.products AS a
        INNER JOIN public.stocks AS b ON a.id=b.id
        WHERE a.id=${productId}`;
    const [product] = await this.queryData(query);

    return product;
  }

  private async getClient(): Promise<Client> {
    if (this.pgClient) {
      return this.pgClient;
    }

    const connectionParams = getPGConnectionParams();
    const pgClient = new Client(connectionParams);

    await pgClient.connect();
    this.pgClient = pgClient;

    return this.pgClient;
  }

  private async queryData(query: string) {
    const pgClient = await this.getClient();
    const queryResults = await pgClient.query(query);

    return queryResults.rows;
  };
}

export const getPGConnectionParams = (): ClientConfig => {
  const {
    PG_HOST: host,
    PG_PORT: portString,
    PG_DB: database,
    PG_USER_NAME: user,
    PG_USER_PASSWORD: password,
  } = process.env;
  const port = Number(portString);

  return {
    host,
    port,
    database,
    user,
    password,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 5000,
  };
};
