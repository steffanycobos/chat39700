import UserModel from "../models/users.model.js";
import { createHash } from "../../utils.js";

class UserManager {
  constructor() {}
  async findUSer(email) {
    let user = UserModel.findOne({
      email: email
    });
    console.log(user, 'dao')
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

  async delete() {
    const deletemany = UserModel.deleteMany({});
    return deletemany;
  }
}
export default UserManager;
