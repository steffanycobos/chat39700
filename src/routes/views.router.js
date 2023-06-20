import { Router } from "express";
import ProductManager from "../dao/db-managers/products.dao.manager.js";
import CartManager from "../dao/db-managers/carts.dao.manager.js";
import MessageManager from "../dao/db-managers/messages.dao.js";
import UserManager from "../dao/db-managers/users.dao.manager.js";


const viewsRouter = Router();
const productManager = new ProductManager();
const cartManager= new CartManager()
const messageManager = new MessageManager();
const userManager= new UserManager()

viewsRouter.get('/', async (req,res)=>{
  res.render('login')
})

viewsRouter.get("/real-time-products", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("real_time_products", { products });
});

viewsRouter.get("/chat", async (req, res) => {
  try {
    const { err, result } = await messageManager.getMessages();
    res.render("chat", { messages: result });
  } catch (error) {
    res.send("error");
  }
});
viewsRouter.get('/products/:pid', async (req,res)=>{  try {
  const pid= req.params.pid
  const products =await  productManager.getProductById(pid);
  res.render("products", { products});
} catch (err) {
  res.send(err);
}

})
viewsRouter.get('/products', async (req,res)=>{ 
  //console.log('req.user', req.user)
   try {
    const products =await  productManager.getProducts();
    res.render("products", { products });
} catch (err) {
  res.send(err);
}
})

viewsRouter.get('/carts/:cid', async (req,res)=>{
const cid= req.params.cid
const cart= await cartManager.checkCart(cid)
res.render("carts", { cart});
})

viewsRouter.get("/login",(req,res)=>{
  res.render("login");
});

viewsRouter.get("/signup",(req,res)=>{
  res.render("register");
 
});
viewsRouter.get('/add',(req,res)=>{
  res.render('addProducts')
})
viewsRouter.get('/update',(req,res)=>{
  res.render('updateProducts')
})
viewsRouter.get("/profile", async (req,res) =>{;
  const userData= await userManager.allUsers()
  let lastUser= (userData.pop()).first_name
  res.render("profile", {lastUser});
})
viewsRouter.get ('/forgot-password', async (req,res)=>{
  res.render('forgotPassword')
})
viewsRouter.get('/reset-password',async(req,res)=>{
  const token = req.query.token;
  res.render('resetPassword', {token})
})
viewsRouter.get('/loggerTest', async (req,res)=>{

  req.logger.debug("Nivel debug");
  req.logger.http("Nivel http");
  req.logger.info("Nivel info");
  req.logger.warning("Nivel warning");
  req.logger.error("Nivel error");
  req.logger.fatal("Nivel fatal");
  res.send("Prueba de loggers")
})
export default viewsRouter;
