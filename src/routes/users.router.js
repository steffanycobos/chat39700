import {Router} from "express";
import passport from "passport";
import {currentUserController, logOutController, changeRoleController} from "../controllers/users.controller.js";
import {checkRole} from "../middlewares/authenticate.js"
import { forgotPasswordService, resetPasswordService } from "../service/users.service.js";
import { signup } from "../service/users.service.js";

const usersRouter = Router();

//LOGIN
usersRouter.post("/login", passport.authenticate('loginStrategy', {
  failureRedirect: '/api/sessions/failure-login'
}),(req, res) => {
   res.redirect('/products')
  });

usersRouter.post('/forgot-password', forgotPasswordService) //FORGOT PASSWORD 
usersRouter.post('/reset-password',resetPasswordService) //RESET PASSWORD
usersRouter.put("/premium/:uid", checkRole(['user']),changeRoleController)//CHANGE ROL

usersRouter.get('/failure-login', (req,res)=>{
    res.send('No se pudo realizar el inicio de sesión.');
    });

usersRouter.get("/logout", logOutController); //LOGOUT
usersRouter.get("/current", currentUserController); //CURRENT USER
usersRouter.get("/github", passport.authenticate("githubSignup")); //LOGIN GITHUB

//SIGN UP
usersRouter.post("/signup", passport.authenticate('signupStrategy', {
    failureRedirect: "/api/sessions/failure-signup" }), (req, res) => {
    res.redirect('/profile')
  });


usersRouter.get('/failure-signup', (req,res)=>{  //FAILURE SIGN UP
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