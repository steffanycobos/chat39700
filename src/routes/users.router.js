import {Router} from "express";
import passport from "passport";
import {currentUserController, logOutController, uploadDocumentsController} from "../controllers/users.controller.js";
import { forgotPasswordService, resetPasswordService } from "../service/users.service.js";
import { uploaderDocuments, uploaderProfile } from "../utils.js";
import { changeRoleService } from "../service/users.service.js";

const usersRouter = Router();

//LOGIN
usersRouter.post("/login", passport.authenticate('loginStrategy', {
  failureRedirect: '/api/sessions/failure-login'
}),(req, res) => {
   res.redirect('/products')
  });

usersRouter.post('/forgot-password', forgotPasswordService) //FORGOT PASSWORD 
usersRouter.post('/reset-password',resetPasswordService) //RESET PASSWORD
usersRouter.put("/premium/:uid",changeRoleService)//CHANGE ROL
usersRouter.put("/:uid/documents", uploaderDocuments.fields([{name:"identificacion",maxCount:1}, {name:"domicilio",maxCount:1},{name:"estadoDeCuenta",maxCount:1}]), uploadDocumentsController)
usersRouter.get('/failure-login', (req,res)=>{
    res.send('No se pudo realizar el inicio de sesión.');
    });

usersRouter.get("/logout", logOutController); //LOGOUT
usersRouter.get("/current", currentUserController); //CURRENT USER
usersRouter.get("/github", passport.authenticate("githubSignup")); //LOGIN GITHUB

//SIGN UP
usersRouter.post("/signup",uploaderProfile.single('avatar'), passport.authenticate('signupStrategy', {
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