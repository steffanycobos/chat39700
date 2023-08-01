import UserModel from "../models/users.model.js";
import { createHash } from "../../utils.js";

class UserManager {
  constructor() {}
  async findUSer(email) {
    let user = UserModel.findOne({
      email: email
    });
    return user
  }
  async findUSerbyId(id) {
    let user = UserModel.findOne({
     _id:id
    });
    return user
  }
 
  async getUser(name, lastname, age, email, password) {
    const user = await UserModel.findOne({
      email: email
    });
    if (!user) {
      const newUser = await UserModel.create({
        first_name: name,
        last_name: lastname,
        age: age,
        email: email,
        password: createHash(password),
        cart
      });
      return newUser;
    } else {
      return `Usuario registrado`;
    }
  }

  async allUsers() {
    const users = await UserModel.find();
    return users;
  }

  async delete(id) {
    const deleteUser = UserModel.deleteOne({_id:id});
    return deleteUser;
  }

  async changeRole(req,res){
    try{
      const userId = req.params.uid;
      console.log(userId,'id')
          const user = await UserModel.findById(userId);
          const userRol = user.rol;
          if(userRol === "user"){
              user.rol = "premium"
          } else if(userRol === "premium"){
              user.rol = "user"
          } else {
              return res.json({status:"error", message:"No se pudo cambiar el rol de usuario."});
          };
       let userModificado= await  UserModel.updateOne({_id:user._id},user);
       return userModificado
       
    }
    catch(err){
      console.log(err.message);
          res.json({status:"error", message:"Hubo un error al intentar cambiar el rol de usuario."})
    }
  }
  
  async forgotPassword(req,res){
    try {
      const {email} = req.body;
      const user = await UserModel.findOne({email:email});
      if(!user){
          return res.send(`<div>Error, <a href="/forgot-password">Email no encontrado. Intenta nuevamente.</a></div>`);
      }
      const token = generateEmailToken(email,60*60);
      await sendRecoveryPass(email,token);
      res.send("Se envio un email a tu cuenta para restablecer la contraseña.  <a href='/login'> <button> Ir a Login </button> </a>");
  } catch (error) {
      res.send(`<div>Error, <a href="/forgot-password">Intente de nuevo</a></div>`)
  }
  }
  
  async resetPassword(req,res){
    try {
      const token = req.query.token;
      const {email, newPassword} = req.body;
  
      const validEmail = verifyEmailToken(token);
      if(!validEmail){
          return res.send(`El enlace ya no es valido, genere un nuevo enlace para recuperar la contraseña <a href="/forgot-password" >Recuperar contraseña</a>`)
      }
      const user = await UserModel.findOne({email:email});
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
     
      const userUpdate = await UserModel.findOneAndUpdate({email:email},userData);
       res.render("login",{message:"contraseña actualizada"});
  } catch (error) {
  console.log(error);
  }
  }

}



export default UserManager;
