import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: String, required: false },
  category: { type: String, required: false },
  brand: { type: String, required: false },
  rating: { type: Number, required: false },
  image: { type: String, required: false },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
