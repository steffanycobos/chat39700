import UserModel from "../models/users.model.js";
import { createHash } from "../../utils.js";

class UserManager {
  constructor() {}

  async getUser(email, password) {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      const newUser = await UserModel.create({ email:email, 
        password: createHash(password)});

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
