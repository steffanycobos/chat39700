import { Router } from "express";
import passport from "passport";
import { uploaderProfile } from "../utils.js";
import { logOutController } from "../controllers/users.controller.js";
import { forgotPasswordService,resetPasswordService } from "../service/users.service.js";


const authRouter= Router()


/// SIGNUP
authRouter.post("/signup",uploaderProfile.single('avatar'), passport.authenticate('signupStrategy', {
    failureRedirect: "/api/auth/failure-signup" }), (req, res) => {
    res.redirect('/profile')
  });
  
//FAILURE SIGN UP
authRouter.get('/failure-signup', (req,res)=>{  
    res.send('No se pudo realizar registro.');
    });

/// LOGIN
authRouter.post('/login', passport.authenticate('loginStrategy', {
    failureRedirect: '/api/auth/failure-login'}), (req, res) => {
     res.redirect('/products')
    });

///FAILURE LOGIN
authRouter.get('/failure-login', (req,res)=>{
    res.send('No se pudo realizar el inicio de sesión.');
    });

/// LOGIN CON GITHUB
authRouter.get("/github", passport.authenticate("githubSignup")); 
authRouter.get(  "/github-callback",passport.authenticate("githubSignup", {
      failureRedirect: "/api/auth/failure-signup",
    }),
    (req, res) => {
      res.send("Usuario autenticado con éxito.");
    }
  );

//LOGOUT
authRouter.get("/logout", logOutController);

///FORGOT PASSWORD
authRouter.post('/forgot-password', forgotPasswordService) 

/// RESET PASSWORD
authRouter.post('/reset-password',resetPasswordService);

export default authRouter;