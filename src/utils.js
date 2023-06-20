import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { faker, Faker, es, en } from "@faker-js/faker";
import options from "./config/options.js";

export const customFaker = new Faker({
  locale: [en],
});

const { commerce, image, database, string } = customFaker;

export const madeProduct = () => {
  return {
    id: database.mongodbObjectId(),
    title: commerce.productName(),
    price: parseFloat(commerce.price()),
    stock: parseInt(string.numeric(2)),
    image: image.url(),
    code: string.alphanumeric(3),
    description: commerce.productDescription(),
  };
};

export const generateProducts = () => {
  let products = [];
  for (let i = 0; i < 50; i++) {
    const product = madeProduct();
    products.push(product);
  }
  return products;
};

export function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function isValidPassword(user, password) {
  return bcrypt.compareSync(user, password);
}
export const generateEmailToken = (email,expireTime)=>{
  const token = jwt.sign({email},options.EMAIL_TOKEN,{expiresIn:expireTime});
  return token;
};

export const verifyEmailToken = (token)=>{
  try {
      const info = jwt.verify(token,options.EMAIL_TOKEN);
      return info.email;
  } catch (error) {
      console.log(error.message);
      return null;
  }
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
