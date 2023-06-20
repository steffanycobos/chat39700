
import UserModel from "../dao/models/users.model.js";
import { changeRoleService } from "../service/users.service.js";
import {transporter, sendRecoveryPass} from "../config/gmail.js";
import { twilioPhone,twilioClient } from "../config/twilio.js";
import { generateEmailToken, verifyEmailToken } from "../utils.js";
import { isValidPassword } from "../utils.js";
import { createHash } from "../utils.js";



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
export  async function  signupEmail(email){
const emailTemplate = `<div>
        <h1>Registro Exitoso!</h1>
        <img src="https://media.tenor.com/CNomc-858rgAAAAC/ganando-ganando-como-siempre.gif/">
        <p>Ya puedes iniciar sesións</p>
        <img width="100px" src="cid:mono" />
</div>`;

    try {
      
        const data = await transporter.sendMail({
            from:"Prueba CoderHouse Steffany Cobos",
            to: email,
            subject:"Registro exitoso",
            html:emailTemplate
        });
  console.log(data)
      
    } catch (error) {
     console.log(error)
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

////CAMBIAR ROL
export const changeRoleController= async(req,res)=>{
  try{
    let changeRole= await changeRoleService()
    if (changeRole){
      return res.send( 'Rol del Usuario modificado con éxito.')
    }else{
      return res.send( 'Rol del Usuario no pudo ser modificado.')
    }
    }
    catch(err){
res.send
    }
}
