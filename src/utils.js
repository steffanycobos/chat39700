
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { faker, Faker, es, en } from "@faker-js/faker";

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
  console.log(user,password,'utils')
  return bcrypt.compareSync(user, password);
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
