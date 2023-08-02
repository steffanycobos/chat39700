import { Router } from "express";
import MessageManager from "../dao/db-managers/messages.dao.js";
import UserManager from "../dao/db-managers/users.dao.manager.js";


const viewsRouter = Router();

const messageManager = new MessageManager();
const userManager= new UserManager()

viewsRouter.get('/', async (req,res)=>{
  res.render('login')
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

viewsRouter.get("/chat", async (req, res) => {
  try {
    const { err, result } = await messageManager.getMessages();
    res.render("chat", { messages: result });
  } catch (error) {
    res.send("error");
  }
});

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
