<<<<<<< HEAD
import { Router, json } from "express";
import passport from "passport";
import {loginController,
  currentUserController,
  logOutController,
checkRole} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.use(json());

usersRouter.post("/login",passport.authenticate('loginStrategy',{
}),
(req,res)=>{
  res.redirect('/products')
});
usersRouter.get("/logout", logOutController);
usersRouter.get("/current", currentUserController);
usersRouter.get("/github", passport.authenticate("githubSignup"));
usersRouter.post( "/signup", passport.authenticate('signupStrategy',{
  failureRedirect: "/api/sessions/failure-signup"
}),
(req,res)=>{
  res.redirect('/profile')
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
=======
import { Router, json } from "express";
import passport from "passport";
import {
  currentUserController,
  logOutController
} from "../controllers/users.controller.js";
import { signup } from "../service/users.service.js";
const usersRouter = Router();

usersRouter.use(json());

usersRouter.post("/login", passport.authenticate('loginStrategy'));
usersRouter.get("/logout", logOutController);
usersRouter.get("/current", currentUserController);
usersRouter.get("/github", passport.authenticate("githubSignup"));
usersRouter.post( "/signup", signup);

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
>>>>>>> 30f199008ec74a8bf280b47cdbb52c0d387c238b
