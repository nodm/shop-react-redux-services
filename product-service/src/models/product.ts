export type CreateProductDTO = {
  title: string,
  description: string,
  imageUrl: string,
  price: number,
  count: number,
};

export type ProductDTO = CreateProductDTO & { id: string };
