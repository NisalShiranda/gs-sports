import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  billItems: {
    type: [
      {
        productID: String,
        productName: String,
        image: String,
        quantity: Number,
        price: Number,
        selectedColor: String,  // ✅ New
        selectedSize: String     // ✅ New
      }
    ],
    required: true
  },
  total: {
    type: Number,
    required: true,
  }
});

const Order = mongoose.model("orders", orderSchema);
export default Order;
