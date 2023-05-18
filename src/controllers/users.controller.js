import { getUserService, allUsersService,deleteService, findUSerService } from "../service/users.service.js";
import { isValidPassword } from "../utils.js";
import { initializedPassport } from "../config/passport.config.js";
import passport from "passport";
import session from "express-session";
import UserModel from "../dao/models/users.model.js";


export function initializeController(){
  passport.authenticate("signupStrategy", {
    failureRedirect: "/failure-signup"},
  async (req, res) => {
    res.redirect("/profile")
  
  })}


export const loginController= async (req,res)=>{
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
        return res.redirect("/products");
      } else {
        res.send("Datos inválidos");
      }
    } else {
      if (isValidPassword(user, password)) {
        req.session.user = user._id;
        req.session.username = email;
        req.session.rol = "user";
        return res.redirect("/products");
      } else {
        res.send("Datos inválidos.");
      }
    }
    return res.redirect("/products");
  }
}
export const userEmail= async (req,res)=>{
  let user= req.session.username
  console.log(user)
  return user

}

export const logOutController=  async (req, res) => {
  req.logOut((error) => {
    if (error) {
      return res.send("No fue posible cerrar sesión.");
    } else {
      req.session.destroy((err) => {
        if (err) return res.send("No fue posible cerrar sesión.");
        res.redirect("/");
      });
    }
  });
}

export const currentUserController= async(req,res)=>{
  if (req.session.user){
  
  return  res.send({userInfo: req.session})
  }
  res.send('Usuario No Logueado')
}

export const authenticateAdmin =(rol)=>{
  return (req,res,next)=>{
console.log(req.session.rol)
    if(req.session.rol != 'admin'){
      return res.json({status:'error', message:'No tienes acceso.'})

    }
    if((!rol.includes(req.user.rol))){
      return res.json({status:'error', message:'No estas autorizado.'})
    }
    next();
  }

}