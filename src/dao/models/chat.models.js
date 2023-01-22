import mongoose from 'mongoose'

const chatCollection = 'chat'

const chatSchema = new mongoose.Schema({
  products: {
    productId : Integer, 
    quantity: Integer
  }
})


export const chatModel = mongoose.model(chatCollection, chatSchema)
