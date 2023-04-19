import { Router, json } from "express";
import UserModel from "../dao/models/users.model.js";
import UserManager from "../dao/db-managers/users.dao.manager.js";
import { isValidPassword } from "../utils.js";
import passport from "passport";

const usersRouter = Router();
const manager = new UserManager();
usersRouter.use(json());

usersRouter.post(
  "/signup",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/failure-signup",
  }),
  async (req, res) => {
    res.redirect("/profile");
  }
);
/*const { email, password } = req.body;
  console.log(email, password);
  let user = await manager.getUser(email, password);
  req.session.user = user.email;
  req.session.rol = "user";
  req.session.isAdmin = false;
  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    req.session.isAdmin = true;
    req.session.rol = "admin";
    console.log(req.session);
  }
  console.log(req.session);
  return res.redirect("/profile");
});*/

usersRouter.get("/failure-signup", (req, res) => {
  res.send("No fue posible registrar el usuario");
});
usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email }).lean();
  if (!user) {
    res.send("Usuario no encontrado!");
  } else {
    if (email === "adminCoder@coder.com") {
      if (isValidPassword(user, password)) {
        req.session.user = user._id;
        req.session.username = email;
        req.session.rol = "admin";
        console.log(req.session.rol);
        return res.redirect("/api/products");
      } else {
        res.send("Datos inválidos");
      }
    } else {
      if (isValidPassword(user, password)) {
        req.session.user = user._id;
        req.session.username = email;
        req.session.rol = "user";
        return res.redirect("/api/products");
      } else {
        res.send("Datos inválidos.");
      }
    }
    return res.redirect("/api/products");
  }
});
usersRouter.get("/login-failes", (req, res) => {
  res.send("No fue posible loguearse");
});
usersRouter.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.send("La sesion no se pudo cerrar");
    res.redirect("/");
  });
});

usersRouter.get("/github", passport.authenticate("githubSignup"));

usersRouter.get(
  "/github-callback",
  passport.authenticate("githubSignup", {
    failureRedirect: "/api/sessions/failure-signup",
  }),
  (req, res) => {
    res.send("Usuario autenticado con éxito.");
  }
);

usersRouter.get("/delete", async (req, res) => {
  const deleteall = await manager.delete();
  res.send(deleteall);
});

export default usersRouter;
