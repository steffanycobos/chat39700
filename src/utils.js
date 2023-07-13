import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { faker, Faker, es, en } from "@faker-js/faker";
import options from "./config/options.js";
import multer from "multer";
import path from "path";

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

/// GUARDAR IMAGENES DE USERS 
const validFields = (first_name,email,password)=>{
  if(!first_name || !email || !password){
      return false;
  } else {
      return true
  }
};


const multerFilterProfile = (req,file,cb)=>{
  const {first_name,email,password}= req.body
  const isValid = validFields(first_name,email,password);
  if(!isValid){
      cb(null, false)
  } else {
      cb(null, true)
  }
};

export const profileStorage= multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, path.join(__dirname,'multer/users/profiles'))
  },
  filename: function(req,file,cb){
    cb(null, `${req.body.email}--perfil-${file.originalname}`)
   
  }
});
export  const uploaderProfile= multer({storage:profileStorage, fileFilter: multerFilterProfile})


///// DOCUMENTOS
 const documentStorage= multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,path.join(__dirname,'multer/users/documents'))
  },
  filename: function(req,file,cb){
    cb(null,`${req.body.email}--documentos-${file.originalname}`)
  }
});
export const uploaderDocuments= multer({storage:documentStorage})


///// IMAGENES PRODUCTOS
const productStorage= multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,path.join(__dirname,'multer/products'))
  },
  filename: function(req,file,cb){
    cb(null,`${req.body.email}--productos-${file.originalname}`)
  }
});
export const uploaderProducts= multer({storage:productStorage})



export default __dirname;
