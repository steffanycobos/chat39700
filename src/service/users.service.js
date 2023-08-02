import UserManager from "../dao/db-managers/users.dao.manager.js";
import UserModel from "../dao/models/users.model.js";
import { generateEmailToken, verifyEmailToken, isValidPassword } from '../utils.js'
import { sendRecoveryPass } from "../config/gmail.js";
import { createHash } from "../utils.js";

let manager = new UserManager();


export async function allUsersService() {
  let users = await manager.allUsers();
  return users;
}


export async function deleteUserService(id) {
  try{
  let deletedUser = await manager.delete(id);
  return deletedUser;
}
  catch(err){
   console.log(err,'err')
  }
}
export async function findUSerService(email) {
  let user = await manager.findUSer(email);

  return user;
}

 export async function changeRoleService(req,res,id) {

   id = req.params.uid
  const user = await manager.findUSerbyId(id);
  if(user.documents.length ==3){
   user.rol= 'premium'
   user.save()
   return  res.send('Rol cambiado con éxito.')
   } else{
    res.send( 'No se pudo realizar el cambio de rol, faltan documentos por cargar.')
   }
 }
 
 export async function forgotPasswordService(req,res){
  try {
    const {email} = req.body;
const user= await manager.findUSer(email)
    if(!user){
        return res.send(`<div>Error, <a href="/forgot-password">Email no encontrado. Intenta nuevamente.</a></div>`);
    }
    const token = generateEmailToken(email,60*60);
    await sendRecoveryPass(email,token);
    res.send("Se envio un email a tu cuenta para restablecer la contraseña.  <a href='/login'> <button> Ir a Login </button> </a>");
} catch (error) {
  req.logger.warning(error)
    res.send(`<div>Error, <a href="/forgot-password">Intente de nuevo</a></div>`)
}
}
 
export async function resetPasswordService(req,res){
  try {
    const token = req.query.token;
    const {email, newPassword} = req.body;

    const validEmail = verifyEmailToken(token);
    if(!validEmail){
        return res.send(`El enlace ya no es valido, genere un nuevo enlace para recuperar la contraseña <a href="/forgot-password" >Recuperar contraseña</a>`)
    }
    const user = await manager.findUSer(email);
    if(!user){
        return res.send("El usuario no esta registrado.")
    }
    if(isValidPassword(user.password, newPassword)){
        return res.send("No puedes usar la misma contraseña");
    }
    const userData = {
        ...user._doc,
        password:createHash(newPassword)
    }
  req.logger.info("userData",userData)
    const userUpdate = await UserModel.findOneAndUpdate({email:email},userData);
   res.render("login",{message:"contraseña actualizada"});
} catch (error) {
req.logger.warning(error);
}
}
