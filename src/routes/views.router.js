import { Router } from "express";
import ProductManager from "../dao/db-managers/products.dao.manager.js";
import MessageManager from "../dao/db-managers/messages.dao.js";

const viewsRouter = Router();
const productManager= new ProductManager()
const messageManager= new MessageManager()
viewsRouter.get("/", async (req, res) => {
  const  result  = await productManager.getProducts();
    res.render("home", { products: result });
  
});

viewsRouter.get("/real-time-products", async (req, res) => {
  const result = await productManager.getProducts();

    res.render("real_time_products", { products: result });
  
});

viewsRouter.get("/chat", async (req, res) => {
  try {
    const { err, result } = await messageManager.getMessages();
    res.render("chat", { messages: result });
  } catch (error) {
    res.send("error");
  }
});

export default viewsRouter;

