import { Client, ClientConfig } from 'pg';

import { ProductDTO } from '@models/product';
import { ProductRepository } from './product.type';

export class ProductPg implements ProductRepository {
  private client: Client;

  constructor(connectionParams = getPGConnectionParams()) {
    this.client = new Client(connectionParams);
  }

  public async getProductList(): Promise<ProductDTO[]> {
    const query = `
      SELECT a.id, a.title, a.description, a.image_url, a.price, b.count
        FROM public.products AS a
        INNER JOIN public.stocks AS b ON a.id=b.id`;

    return await this.sendQuery(query);
  }

  public async getProductById(productId: string): Promise<ProductDTO> {
    const query = `
      SELECT a.id, a.title, a.description, a.image_url, a.price, b.count
        FROM public.products AS a
        INNER JOIN public.stocks AS b ON a.id=b.id
        WHERE a.id=${productId}`;
    const [product] = await this.sendQuery(query);

    return product;
  }

  private async sendQuery(query: string) {
    let queryResults;

    try {
      await this.client.connect();
      queryResults = await this.client.query(query);
    } catch(e) {
      throw e;
    } finally {
      await this.client.end();
    }

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
