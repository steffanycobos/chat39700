import { Router, json } from "express";
import __dirname from "../utils.js";
import { getCartController, addCartController,checkCartController,addProductToCartController,deleteProductController,deleteProductsInCartController,updateQuantityController } from "../controllers/carts.controller.js";
import CartManager from "../dao/db-managers/carts.dao.manager.js";

const cartRouter = Router();
let manager= new CartManager()

cartRouter.use(json());
cartRouter.get('/',getCartController)
cartRouter.post('/',addCartController)
cartRouter.get('/:cid',checkCartController)
cartRouter.put("/:cid/product/:pid/", addProductToCartController)
cartRouter.delete('/:cid/product/:pid', deleteProductController)
cartRouter.delete('/:cid',deleteProductsInCartController)
cartRouter.put('/:cid/product/:pid', updateQuantityController)
cartRouter.get('/:cid/purchase',async (req,res)=>{
    let cid= req.params.cid
    let cart= manager.ticketCart(cid)
    res.send(cart)
})


export default cartRouter;