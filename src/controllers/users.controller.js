
//import { getUserService, allUsersService,deleteService, findUSerService } from "../service/users.service.js";
import { isValidPassword } from "../utils.js";
import { initializedPassport } from "../config/passport.config.js";
import passport from "passport";
import UserModel from "../dao/models/users.model.js";
import transporter from "../config/gmail.js";
import { twilioPhone,twilioClient } from "../config/twilio.js";




  export const loginController = async(req,res)=>{
    const { email, password }= req.body;
  const user = await UserModel.findOne({ email: email }).lean();
  if (!user) {
    res.send("Usuario no encontrado!");
  } else {
    if (email === "adminCoder@coder.com") {
      console.log(req.session)
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
        console.log( req.session,'login')
        return res.redirect("/products");
      } else {
        res.send("Datos inválidos.");
      }
    }
    return res.redirect("/products");
  }}
  export const checkRole = (roles) => {
    return (req, res, next) => {
      // AUTENTICADO
      console.log(req.session, 'controller')
      if (!req.session) {
        return res.json({
          status: "error",
          message: "You need to be authenticated",
        });
      }
      // AUTORIZADO
      if (!roles.include(req.session.rol)) {
        return res.json({ status: "error", message: "You are not authorized" });
      }
      next();
    };
  };
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


////// GMAIL
export const signupEmail=async(req,res)=>{
const emailTemplate = `<div>
        <h1>Registro Exitoso!</h1>
        <img src="https://media.tenor.com/CNomc-858rgAAAAC/ganando-ganando-como-siempre.gif/">
        <p>Ya puedes iniciar sesións</p>
        <img width="100px" src="cid:mono" />
</div>`;

    try {
        //logica del registro
        const data = await transporter.sendMail({
            //estructura del correo
            from:"Prueba CoderHouse Steffany Cobos",
            to:'cobosleandra2@gmail.com',
            subject:"Registro exitoso",
            html:emailTemplate
        });
        console.log("data", data);
      
    } catch (error) {
        console.log(error.message);
    }
}

//////TWILIO
export const signupTwilio= async (req,res)=>{
  try {
    const message = await twilioClient.messages.create({
        body:"Su compra se realizo correctamente",
        from: twilioPhone,
        to:"+525574318332"
    });
    console.log("message:", message);
} catch (error) {
    console.log(error.message);
}}
