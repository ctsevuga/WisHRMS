


import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    Product: {
      type: String,
      unique: true,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;