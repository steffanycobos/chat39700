
import cartsModel from "../models/carts.models.js";

class CartManager {
  constructor() {}

  getCart = async () => {
    let carts = await cartsModel.find().lean();
    let array = Object.values(carts);
    console.log(array, typeof array);
    return carts;
  };

  async addCart(products) {
    let cart = await cartsModel.create({ products });
    return cart;
  }

  async checkCart(id) {
    const cart = await cartsModel.find({ _id: id });
    return cart;
  }

  addProductToCart = async (cartID, product) => {
    const cart = await cartsModel.find({ _id: cartID });
    console.log(cart, "<= Cart", typeof cart);
    console.log(cart[0], "<=cart[0]");

    const productExiste = cart[0].products.id === product[0].id;

    if (productExiste) {
      productExiste.quantity = productExiste.quantity + 1;
      return [cart];
    } else {
      let newProducts = { id: product[0].id, quantity: 1 };
      let newCart = cart[0].products.concat(newProducts);

      return newCart;
    }
  };
}

export default CartManager;