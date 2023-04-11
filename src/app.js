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


const app = express();


app.use(urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.use(express.static(__dirname + "/../public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);


let manager = new ChatManager();
const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

mongoose
  .connect(
    "mongodb+srv://cobosleandra2:171294@cluster0.ydfb7m6.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((conn) => {
    console.log("Connected to DB!");
  })
  .catch(() => {
    console.log("Error");
  });


  app.use(session({
    store:MongoStore.create({
      mongoUrl:"mongodb+srv://cobosleandra2:171294@cluster0.ydfb7m6.mongodb.net/?retryWrites=true&w=majority",
     ttl:10000
    }),
    secret:"claveSecreta",
    resave:true,
    saveUninitialized:true
  }))

  app.use('/', usersRouter)
  
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
