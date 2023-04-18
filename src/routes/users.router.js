import { Router, json } from "express";
import UserModel from "../dao/models/users.model.js";
import UserManager from "../dao/db-managers/users.dao.manager.js";

const usersRouter = Router();
const manager = new UserManager();
usersRouter.use(json());

usersRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  

  console.log(email, password);
  let user = await manager.getUser(email, password);
  req.session.user = user.email;
  req.session.rol = "user"
  req.session.isAdmin = false;
  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    req.session.isAdmin = true;
    req.session.rol = "admin";
    console.log(req.session);
  }
  console.log(req.session);
  return res.redirect("/profile");
});

usersRouter.post("/login", async (req, res) => {
  const email = req.body;
  console.log(email.Email, email.password);
  const authorized = await UserModel.findOne({
    email: email.Email,
    password: email.password,
  });
  if (!authorized) {
    res.send("Usuario no encontrado.");
  } else {
    if (
      email.Email === "adminCoder@coder.com" &&
      email.password === "adminCod3r123"
    ) {
      req.session.user = email.Email;
      req.session.rol = "admin";
      req.session.isAdmin = true;
      console.log(req.session);
      return res.redirect("/api/products")
    } else {
      req.session.user = email.Email;
      req.session.isAdmin = false;
      req.session.rol = "user";
      return  res.redirect("/api/products");
    }
  }
});

usersRouter.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.send("La sesion no se pudo cerrar");
    res.redirect("/");
  });
});
usersRouter.get('/delete', async (req,res)=>{
    const deleteall= await manager.delete()
    res.send(deleteall)
})

export default usersRouter;
