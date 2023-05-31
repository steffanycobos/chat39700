import UserManager from "../dao/db-managers/users.dao.manager.js";
import UserModel from "../dao/models/users.model.js";
import jwt from "jsonwebtoken";
import { createHash } from "../utils.js";
let manager = new UserManager();

export const signup = async (req, res) => {

    const { first_name, last_name, email, age, password } = req.body;
    console.log(first_name, last_name, email, age, password)
    const user = await UserModel.findOne({email:email})
    console.log(user)
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

