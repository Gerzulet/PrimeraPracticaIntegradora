import mongoose from 'mongoose'

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
  products: {
    productId : Integer, 
    quantity: Integer
  }
})


export const cartModel = mongoose.model(cartCollection, cartSchema)
