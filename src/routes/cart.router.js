import { Router, json } from "express";
import __dirname from "../utils.js";
import CartManager from "../dao/db-managers/carts.dao.manager.js";
//import ProductManager from "../dao/files-manager/productManager.js";
//import CartManager from "../dao/files-manager/cartManager.js";


const cartRouter = Router();
const manager= new CartManager()

cartRouter.use(json());

// MUESTRA LOS CARTS
cartRouter.get("/", async (req, res) => {
  let cart = await manager.getCart();
  res.send({status:'ok',payload: cart});
});

//AGREGA CART
cartRouter.post("/", async (req, res) => {
  const {products}=req.body
  const result= await manager.addCart(products)
  res.status(201).send({ status: "ok", payload: result });
});

//BUSCA EL CARRITO POR ID
cartRouter.get("/:cid", async (req, res) => {
  let cid = (req.params.cid);
  let cart = await manager.checkCart(cid);
  res.send({status:'ok',payload: cart});
});

//AGREGA PRODUCTO AL CARRITO
cartRouter.put("/:cid/product/:pid", async (req, res) => {
  let cid =(req.params.cid);
  let pid =(req.params.pid);
  let cart = await manager.addProductToCart(cid, pid);
  res.send({status:'ok',payload:cart});
});

//ELIMINA PRODUCTO EN EL CARRITO
cartRouter.delete('/:cid/product/:pid', async(req,res)=>{
  let cid =(req.params.cid);
  let pid =(req.params.pid);
  let products= await manager.deleteProduct(cid,pid)
  res.send({status:'ok',payload:products})
})

//ELIMINA TODOS LO PRODUCTOS DEL CARRITO
cartRouter.delete('/:cid', async(req,res)=>{
  let cid =(req.params.cid);
const cart= await manager.deleteProductsInCart(cid)
res.send({status:'ok',payload: cart})
})

//ACTUALIZA La cantidad
cartRouter.put('/:cid/product/:pid', async(req,res)=>{
  let cid =(req.params.cid);
  let pid= req.params.pid
  const{quantity}= req.body
  let cart= await manager.updateQuantity(cid,pid,quantity)
res.send({status:'ok',payload:cart})
});



export default cartRouter;