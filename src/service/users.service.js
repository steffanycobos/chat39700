import UserManager from "../dao/db-managers/users.dao.manager.js";
import UserModel from "../dao/models/users.model.js";
import { generateEmailToken, verifyEmailToken, isValidPassword } from '../utils.js'
import { sendRecoveryPass } from "../config/gmail.js";
import { createHash } from "../utils.js";

let manager = new UserManager();

export const signup = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    console.log(first_name, last_name, email, age, password)
    const user = await UserModel.findOne({email:email})
    console.log(user, req.user.email, 'service')
    if (user) {  
      console.log("User was already registered");
    res.redirect("/login");
  } else{
      let rol = "user";
      if (email.endsWith("@coder.com")) {
        rol = "admin";
      }
      const newUser = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        rol,
      };
      const userCreated = await UserModel.create(newUser);
        res.redirect("/profile");
    } 
  
    }

export async function allUsersService() {
  let users = await manager.allUsers();
  return users;
}

export async function deleteService() {
  let deletedUser = await manager.delete();
  return deletedUser;
}
export async function findUSerService(email) {
  let user = await manager.findUSer(email);
  console.log(user,'service')
  return user;
}

 export async function changeRoleService(req,res) {
   try {
     const userId = req.params.uid;
     console.log(userId, 'id')
     const user = await manager.findUSerbyId(userId);
     const userRol = user.rol;
     if (userRol === "user") {
       user.rol = "premium"
     } else if (userRol === "premium") {
       user.rol = "user"
     }
     let userModificado = await UserModel.updateOne({
       _id: user._id
     }, user);
     return userModificado
   } catch (err) {
     console.log(err.message);
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
  console.log(error)
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
    console.log("userData",userData)
    const userUpdate = await UserModel.findOneAndUpdate({email:email},userData);
   res.render("login",{message:"contraseña actualizada"});
} catch (error) {
console.log(error);
}
}
