
import { isValidPassword } from "../utils.js";
import UserModel from "../dao/models/users.model.js";
import transporter from "../config/gmail.js";
import { twilioPhone,twilioClient } from "../config/twilio.js";
import { addLogger } from "../utils/logger.js";




  export const loginController = async(req,res)=>{
    const { email, password }= req.body;
  const user = await UserModel.findOne({ email: email }).lean();
  if (!user) {
    //req.logger.warning('Usuario No Encontrado')
    res.send("Usuario no encontrado!");
  } else {
    if (email === "adminCoder@coder.com") {
      if (isValidPassword(user, password)) {
        req.session.user = user._id;
        req.session.username = email;
        req.session.rol = "admin";
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
  }}


export const userEmail= async (req,res)=>{
  let user= req.session.username
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
  if (req.user){
  
  return  res.send({userInfo: req.user})
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
      
        const data = await transporter.sendMail({
            from:"Prueba CoderHouse Steffany Cobos",
            to:'cobosleandra2@gmail.com',
            subject:"Registro exitoso",
            html:emailTemplate
        });
        req.logger.info(data);
      
    } catch (error) {
     req.logger.warning(error)
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
req.logger.info("message:", message);
} catch (error) {
req.logger.warnig(error.message);
}
}
