import cartsModel from "../models/carts.models.js";
import ProductManager from "./products.dao.manager.js";
import { userEmail } from "../../controllers/users.controller.js";
import mongoose from "mongoose";
import productsModel from "../models/products.models.js";
import ticketsModel from "../models/tickets.models.js"
import {v4 as uuidv4} from 'uuid';

let manager = new ProductManager();
class CartManager {
  constructor() {}

  getCart = async () => {
    let carts = await cartsModel.find();
    console.log(carts,'dao')
    return carts;
  };

  async addCart() {
    const result = await cartsModel.create({});
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

  async ticketCart(cid, req,res){
    const cart = await cartsModel.find({ _id: cid })
    if(cart){
      if(!cart[0].products.length){
        return ('Necesita Ingresar productos al carrito antes de finalizar la compra')
      }
    let availableProducts= []
    let noProducts=[]
    let i;
   
      let cartProducts=cart[0].products.map(x=>{ return x.product})// me da el id del producto para buscar 
      console.log(cart[0])
     let cartqua=cart[0].products.map(x=>{ return x.quantity})
   
      for(i=0; i<cart[0].products.length;i++){
   let productoDB= await productsModel.findById(cartProducts[i])
   let stock = productoDB.stock
   if (stock>= cartqua[i]){
   availableProducts.push(cart[0].products[i])
   }
   else {
 noProducts.push(cart[0].products)
   }
  }
console.log(availableProducts,'ticket')

   let ticket={
    code: uuidv4(),
    purchase_datetime:  new Date,
    amount:500,
    purchaser: 'cobos@gmail.com'}
   const ticketCreated = await ticketsModel.create(ticket);
   return (ticketCreated)
} else {
return console.log("el carrito no existe")
}
}
  }


export default CartManager;
