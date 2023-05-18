import { Router, json } from "express";
import __dirname from "../utils.js";
import { getCartController, addCartController,checkCartController,addProductToCartController,deleteProductController,deleteProductsInCartController,updateQuantityController, ticketCartController } from "../controllers/carts.controller.js";


const cartRouter = Router();


cartRouter.use(json());
cartRouter.get('/',getCartController)
cartRouter.post('/',addCartController)
cartRouter.get('/:cid',checkCartController)
cartRouter.put("/:cid/product/:pid/", addProductToCartController)
cartRouter.delete('/:cid/product/:pid', deleteProductController)
cartRouter.delete('/:cid',deleteProductsInCartController)
cartRouter.put('/:cid/product/:pid', updateQuantityController)
cartRouter.get('/:cid/purchase',ticketCartController)


export default cartRouter;