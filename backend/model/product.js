const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  tags: {
    type: String,
  },
  ShopPrice:{
    type: Number,
    required:[true, "Please enter shop's Marked price!"],
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  stock: [{
    size: {
      type: String,
      enum: ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL'],
      required: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    required: {
      type: Boolean,
      default: true
    },
    isSelected:{
      type:Boolean,
      default:false
    }
  }], 
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  neckType: {
    type: String,
  },
  sleeveType: {
    type: String,
  },
  
  brand: {
    type: String,
  },
  color: {
    type: String,
    required: [true, "Please select color!"],
  },
  fabric: {
    type: String,
  },
  occasion: {
    type: String,
  },
  fit: {
    type: String,
  },
  gender: { 
    type: String,
    required: [true, "Please Select gender"],
  },
  
 
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
        min: 0, 
        default: 1,
      },
      
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt:{
        type: Date,
        default: Date.now(),
      }
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
