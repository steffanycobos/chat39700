import { getCartService, addCartService,checkCartService,addProductToCartService,deleteProductService,deleteProductsInCartService, updateQuantityService} from "../service/carts.service.js";
import { getProductByIdService } from "../service/products.service.js";
import { newTicket } from "../dao/db-managers/tickets.dao.manager.js";
import { v4 as uuidv4 } from "uuid";



export const getCartController = async (req, res) => {
  let cart = await getCartService()
  res.json({
    status: "success",
    payload: cart
  })
}

export const addCartController = async (req, res) => {

  const result = await addCartService()
  res.status(201).send({
    status: 'success',
    payload: result
  });
}

export const checkCartController = async (req, res) => {
  let cid = (req.params.cid);
  let cart = await checkCartService(cid);
  res.send({
    status: 'ok',
    payload: cart
  });
}

export const addProductToCartController = async (req, res) => {
  let cid = (req.params.cid);
  let pid = (req.params.pid);
  let cart = await addProductToCartService(cid, pid);
  res.send({
    status: 'ok',
    payload: cart
  });
}

export const deleteProductsInCartController = async (req, res) => {
  let cid = (req.params.cid);
  const cart = await deleteProductsInCartService(cid)
  res.send({
    status: 'ok',
    payload: cart
  })
}

export const deleteProductController = async (req, res) => {
  let cid = (req.params.cid);
  let pid = (req.params.pid);
  let products = await deleteProductService(cid, pid)
  res.send({
    status: 'ok',
    payload: products
  })
}

export const updateQuantityController = async (req, res) => {
  let cid = (req.params.cid);
  let pid = req.params.pid
  const { quantity } = req.body
  let cart = await updateQuantityService(cid, pid, quantity)
  res.send({
    status: 'ok',
    payload: cart
  })
}

// GENERAR TICKET
export const ticketCartController = async (req, res) => {
  let cid = req.params.cid
  let emailUser = req.user.email
  const cart = await checkCartService(cid)
try{
  if (cart) {
    if (!cart[0].products.length) {
      return res.send("Necesita ingresar productos al carrito antes de finalizar la compra");
    }
    let availableProducts = [];
    let noProducts = [];
    let i;
    let suma = 0
    let cartProducts = cart[0].products.map((x) => {
      return x.product;
    });
    let cartqua = cart[0].products.map((x) => {
      return x.quantity;
    });
    for (i = 0; i < cart[0].products.length; i++) {
      let productoDB = await getProductByIdService(cartProducts[i]);
      let stock = productoDB[0].stock;

      if (stock >= cartqua[i]) {
        availableProducts.push(productoDB);
        suma = (availableProducts[0][0].price * cartqua[i]) + suma
        let ticket = {
          code: uuidv4(),
          purchase_datetime: new Date(),
          amount: suma,
          purchaser: emailUser
        };
        const ticketCreated = await newTicket(ticket);
        req.logger.info(ticketCreated)
        res.send({
          status: 'success',
          payload: ticketCreated
        })
        return ticketCreated;

      } else {
        noProducts.push(productoDB);
        console.log('Productos NO Disponibles: ', noProducts)
      }
    }
  }}
  catch(err){
    res.send({status:"error", message: err})
  }
}