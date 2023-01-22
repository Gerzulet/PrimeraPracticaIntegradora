import { productModel } from '../dao/models/products.models'

class productDao {

  async getProducts() {
    return await productModel.find()
  }

  
  async getProductById(id) {
    return await productModel.findById(id)
  }

  
  async createProduct(product) {
    return await productModel.create(product)
  }
 
  async updateProduct(id,product) {
    return await productModel.findByIdAndUpdate(id,product,{new:true})
  }
 
  async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id)
  }
}

export default productDao;

