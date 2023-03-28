import { Router, json } from "express";
import __dirname from "../utils.js";
import CartManager from "../dao/db-managers/carts.dao.manager.js";
import ProductManager from "../dao/db-managers/products.dao.manager.js";
//import ProductManager from "../dao/files-manager/productManager.js";
//import CartManager from "../dao/files-manager/cartManager.js";


const cartRouter = Router();
const manager= new CartManager()
const productManager= new ProductManager()
cartRouter.use(json());

cartRouter.get("/", async (req, res) => {
  let cart = await manager.getCart();
  res.send({status:'ok',payload: cart});
});


cartRouter.post("/", async (req, res) => {

  const {products}=req.body
  const result= await manager.addCart(products)
  res.status(201).send({ status: "ok", payload: result });
});


cartRouter.get("/:cid", async (req, res) => {
  let cid = (req.params.cid);
  let cart = await manager.checkCart(cid);
  res.send({status:'ok',payload: cart});
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  let cid =(req.params.cid);
  let pid =(req.params.pid);
  let product = await productManager.getProductById(pid);
  let cart = await manager.addProductToCart(cid, product);
  res.send({status:'ok',payload:cart});
});

export default cartRouter;