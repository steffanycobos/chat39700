import productsModel from "../models/products.models.js";

class ProductManager {
  constructor() {}

 async getProducts(){
    const products = await productsModel.find();
    return products;
  };

  async addProducts(title, description, price, thumbnail, code, stock) {
    let newProduct = await productsModel.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    return newProduct;
  }

  async getProductById(id) {
    const product = await productsModel.find({ _id: id });
    return product;
  }
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    const filter = { _id: id };
    const update = { title, description, price, thumbnail, code, stock };
    let product = await productsModel.findOneAndUpdate(filter, update);

    return product;
  }

  async deleteProduct(id){
    const productDelete= await productsModel.deleteOne({ _id: id })
    return productDelete;
  }
}

export default ProductManager;
