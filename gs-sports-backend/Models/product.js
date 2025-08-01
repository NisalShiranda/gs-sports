// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//     productID : {
//         type: String,
//         required: true,
//         unique: true
//     },

//     name: {
//         type: String,
//         required: true,
//     },

//     altNames : {
//         type: [String],
//         default : [],
//     },

//     price : {
//         type: Number,
//         required: true,
//     },

//     labeledPrice : {
//         type: Number,
//         required: true,
//     },

//     description : {
//         type: String,
//         required: true,
//     },

//     images : {
//         type: [String],
//         default : ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLLGJyDSFKFFshOkKHuyDA_-hWb-SkpGTlGw&s"],
//         required: true,
//     },

//     stock : {
//         type: Number,
//         required: true,
//     }
// })

// const Product = mongoose.model("products", productSchema);

// export default Product;
// models/product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  altNames: { type: [String], default: [] },
  price: { type: Number, required: true },
  labeledPrice: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  stock: { type: Number, required: true },

  category: {
    type: String,
    enum: ['Accessory', 'Cloth', 'Trophy', 'Shoe'],
    required: true,
  },
  colors: {
    type: [String],
    default: [],
  },
  sizes: {
    type: [String],
    default: [],
  },
});

const Product = mongoose.model('products', productSchema);
export default Product;
