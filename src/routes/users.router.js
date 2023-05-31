import {
  Router,
  json
} from "express";
import passport from "passport";
import {
  loginController,
  currentUserController,
  logOutController,
  checkRole
} from "../controllers/users.controller.js";

const usersRouter = Router();


usersRouter.post("/login", passport.authenticate('loginStrategy', {
  failureRedirect: '/failure-login'
}),(req, res) => {
   res.redirect('/products')
  });

usersRouter.get('/failure-login', (req,res)=>{
    res.send('No se pudo realizar el inicio de sesion, ocurrio un fallo');
    });
usersRouter.get("/logout", logOutController);
usersRouter.get("/current", currentUserController);
usersRouter.get("/github", passport.authenticate("githubSignup"));
usersRouter.post("/signup", passport.authenticate('signupStrategy', {
    failureRedirect: "/failure-signup" }), (req, res) => {
    res.redirect('/profile')
  });
usersRouter.get('/failure-signup', (req,res)=>{
    res.send('No se pudo realizar registro.');
    });

usersRouter.get(
  "/github-callback",
  passport.authenticate("githubSignup", {
    failureRedirect: "/api/sessions/failure-signup",
  }),
  (req, res) => {
    res.send("Usuario autenticado con éxito.");
  }
);

export default usersRouter;