import { ClientConfig, Pool } from 'pg';

import { Product, ProductDTO } from '../models/product';
import { ProductRepository } from './product.type';

export class ProductPg implements ProductRepository {
  constructor(private readonly connectionParams = getPGConnectionParams()) {
  }

  public  async addProduct(product: Product): Promise<ProductDTO> {
    const pool = new Pool(this.connectionParams);
    const client = await pool.connect();
    let id;

    try {
      const {
        title,
        description,
        imageUrl,
        price,
        count,
      } = product;

      await client.query("BEGIN");

      const productQuery = `
        INSERT INTO products
          (title, description, image_url, price) VALUES ($1, $2, $3, $4)
          RETURNING id;`;
      const { rows } = await client.query(productQuery, [title, description, imageUrl, price]);
      const [newProduct] = rows;
      id = newProduct.id;

      const stockQuery = `INSERT INTO stocks (id, count) VALUES ($1, $2);`;
      await client.query(stockQuery, [newProduct.id, count]);

      await client.query('COMMIT');
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }

    return { id, ...product };
  }
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
