import { getCartService,addCartService,checkCartService,addProductToCartService,deleteProductService,deleteProductsInCartService,updateQuantityService} from "../service/carts.service.js";
import { getProductByIdService } from "../service/products.service.js";
import { newTicket } from "../dao/db-managers/tickets.dao.manager.js";
import { v4 as uuidv4 }   from "uuid";
import { transporter } from "../config/gmail.js";



export const getCartController = async (req, res) => {
  let cart = await getCartService()
  res.render('carts', {cart})
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
  const {quantity} = req.body
  let cart = await updateQuantityService(cid, pid, quantity)
  res.send({
    status: 'ok',
    payload: cart
  })
}

export async function ticketEmail(email, data) {
  const emailTemplate = `<div>
        <h1>Ticket de Compra!</h1> 
        <p>Hola! Este es tu Ticket de compra:</p>
        ${data}
        <img width="100px" src="cid:mono" />
</div>`;
  try {
    const data = await transporter.sendMail({
      from: "Prueba CoderHouse Steffany Cobos",
      to: email,
      subject: "Ticket de Compra",
      html: emailTemplate,
    });
  } catch (error) {
    console.log(error);
  }
}

// GENERAR TICKET
export const ticketCartController = async (req, res) => {
  let cid = req.params.cid
  let emailUser = req.user.email
  const cart = await checkCartService(cid)

  if (cart) {
    if (!cart[0].products.length) {
      return res.send("Necesita ingresar productos al carrito antes de finalizar la compra");
    }
    let availableProducts = [];
    let noProducts = [];
    let i;
    let total = 0
    let cartProducts = cart[0].products.map((x) => { // ID DE LOS PRODUCTOS DEL CARRITO
      return x.product;
    });
    console.log(cartProducts, 'cartProducts')
    let cartqua = cart[0].products.map((x) => { // CANTIDAD DE PRODUCTOS
      return x.quantity;
    });
    for (i = 0; i < cart[0].products.length; i++) {
      let productoDB = await getProductByIdService(cartProducts[i]);
      let stock = productoDB[0].stock; //VERIFICAR STOCK

      if (stock >= cartqua[i]) { // SI HAY MAS STOCK QUE CANTIDAD SOLICITADA, SE GENERA EL TICKET 
        availableProducts.push(productoDB);
        total = (availableProducts[i][0].price * cartqua[i]) + total // SUMATORIA DE PRECIOS

      } else if (stock < cartqua[i]) {
        noProducts.push(productoDB);
        console.log('Productos NO Disponibles: ', noProducts)
      }
    }
    let ticket = {
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount: total,
      purchaser: emailUser
    };
    const ticketCreated = await newTicket(ticket);
    req.logger.info(ticketCreated)
    res.send({
      status: 'success',
      payload: ticketCreated
    })
    ticketEmail(emailUser, JSON.stringify(ticket))
    return ticketCreated;
  }

}