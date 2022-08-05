export type Product = {
  title: string,
  description: string,
  imageUrl: string,
  price: number,
  count: number,
};

export type ProductDTO = Product & { id: string };
