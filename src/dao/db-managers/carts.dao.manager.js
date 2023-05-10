import cartsModel from "../models/carts.models.js";
import ProductManager from "./products.dao.manager.js";
import mongoose from "mongoose";
import productsModel from "../models/products.models.js";

let manager = new ProductManager();
class CartManager {
  constructor() {}

  getCart = async () => {
    let carts = await cartsModel.find().lean();
    let array = Object.values(carts);
    console.log(array, typeof array);
    return carts;
  };

  async addCart() {
    const newCart = {
      products: [],
    };
    const result = await cartsModel.create(newCart);
    return result;;
  }

  async checkCart(id) {
    const cart = await cartsModel.find({ _id: id });
    return cart;
  }

  async addProductToCart(cartID, productID) {
    let cart = await cartsModel.findById({ _id: cartID })
    let productDB= await productsModel.findById(productID)
console.log(cart.products)
    const productExiste = cart.products.find((p) => p.product.code === productDB.code);
    if(productExiste){ productExiste.quantity++; 
      cart.save()
      console.log(cart)
    return cart
  }
    else {
      cart.products.push({product:productID})
      cart.save()
      return cart
    }
    
  }
  async deleteProduct(cartID, productID) {
    const cart = await cartsModel.find({ _id: cartID });
    console.log(cart);
    let productInCart = await manager.deleteProduct(productID);
    productInCart.save()
    console.log(productID);
    return productInCart;
  }

  async deleteProductsInCart(cid) {
    const cart = await cartsModel.findOne({ _id: cid });
    let products = delete cart.products;
    if (products === true) {
      cart.products = [];
      await cart.save();
      return [cart];
    }
  }

  async updateQuantity(cid, pid, quantity) {
    const cart = await cartsModel.find({ _id: cid });
    let productInCart = cart[0].products.find((x) => x.id === pid);
    console.log(cart[0], productInCart);
    productInCart.quantity = quantity;
    return cart
  }
}

export default CartManager;
