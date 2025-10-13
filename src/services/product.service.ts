import Product from '../models/product.model';

export const createProduct = async (data: {
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  rating: number;
  image?: string;
}) => {
  return await Product.create(data);
};

export const getAllProducts = async () => {
  return await Product.find();
};
