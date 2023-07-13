
import UserModel from "../dao/models/users.model.js";
import {transporter} from "../config/gmail.js";
import { twilioPhone,twilioClient } from "../config/twilio.js";



export const logOutController=  async (req, res) => {
 
  const user = {...req.user};
    req.session.destroy(async(err)=>{
        if(err){
          return res.json({status:"error", message:"No fue posible cerrar sesión."})
        }
        else{
          user.last_connection = new Date();
        const userUpdated = await UserModel.findByIdAndUpdate(user._doc._id,user);
       userUpdated.save()
        res.redirect('/login')
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

//// SUBIR DOCUMENTOS

export const uploadDocumentsController= async (req,res)=>{
  try {
    const userId = req.params.uid;
    const user = await UserModel.findById(userId);
    if(user){
        const identificacion = req.files['identificacion']?.[0] || null;
        const domicilio = req.files['domicilio']?.[0] || null;
        const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
        const docs = [];
        if(identificacion){
            docs.push({name:"identificacion",reference:identificacion.filename});
        }
        if(domicilio){
            docs.push({name:"domicilio",reference:domicilio.filename});
        }
        if(estadoDeCuenta){
            docs.push({name:"estadoDeCuenta",reference:estadoDeCuenta.filename});
        }
        if(docs.length === 3){
            user.status = "Completo";
        } else {
            user.status = "Incompleto";
        }
        user.documents = docs;
        const userUpdated = await UserModel.findByIdAndUpdate(user._id,user);
        userUpdated.save()
        res.json({status:"success", message:"Documentos cargados."});

    } else {
        res.json({status:"error", message:"No fue posible cargar los documentos."})
    }
} catch (error) {
    console.log(error.message);
    res.json({status:"error", message:"Error al cargar los documentos."})
}
}
