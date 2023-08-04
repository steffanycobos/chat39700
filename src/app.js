import express from "express";
import { urlencoded } from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializedPassport } from "./config/passport.config.js";
import options from "./config/options.js";
import { connectDB } from "./config/dbConnection.js";
import cookieParser from "cookie-parser";
import { addLogger } from "./utils/logger.js";
import { swaggerSpecs } from "./config/docs.config.js";
import swaggerUi from "swagger-ui-express"

import ChatManager from "./dao/db-managers/messages.dao.js"

import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import authRouter from "./routes/auth.router.js";

const app = express();

app.use(express.json())
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../public"));
connectDB()
let PORT= options.PORT
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.use(session({
  store:MongoStore.create({
    mongoUrl:options.MONGO_URL
  }),
  secret:"claveSecreta",
  resave:true,
  saveUninitialized:true,
  ttl:1000000
}))
initializedPassport();
app.use(cookieParser())
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


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use(addLogger);
app.use("/", viewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpecs));

