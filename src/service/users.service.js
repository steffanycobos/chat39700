import UserManager from "../dao/db-managers/users.dao.manager.js";

let manager = new UserManager();

export async function getUserService(name, lastname, age, email, password) {
  let user = await manager.getUser(name, lastname, age, email, password);
  return user;
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
