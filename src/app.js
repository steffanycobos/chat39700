import express from "express";
import mongoose, { Error } from "mongoose";
import { urlencoded } from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import ChatManager from "./dao/db-managers/messages.dao.js"
import usersRouter from "./routes/users.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializedPassport } from "./config/passport.config.js";
import config from "./config/config.js";
import { connectDB } from "./config/dbConnection.js";

const app = express();

app.use(express.json())
app.use(urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.use(express.static(__dirname + "/../public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

connectDB()

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);


let PORT= config.PORT
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


  app.use(session({
    store:MongoStore.create({
      mongoUrl:config.MONGO_URL
    }),
    secret:"claveSecreta",
    resave:true,
    saveUninitialized:true
  }))
  initializedPassport();
  app.use(passport.initialize());
  app.use(passport.session());
  let manager = new ChatManager();
  const io = new Server(httpServer);
  
  io.on("connection", (socket) => {
    console.log("New client connected.");
    
    socket.on("new-message", async (data) => {
      const { stat, result } = await manager.newMessage(data);
      io.emit("messages", result.result);
    });
  });
  
  app.set("views", __dirname + "/views");
  app.set("view engine", "handlebars");
  app.use(express.static(__dirname + "/public"));
  
  app.use((req, res, next) => {
    req.io = io;
    next();
  });
  app.use("/", viewsRouter);
  app.use('/api/sessions', usersRouter)
  