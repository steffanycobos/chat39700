
/////FILES
import CartManagerFile from "./file-managers/cartManager.js";
import ProductManagerFile from "./file-managers/productManager.js"

////MONGO
import CartManagerDB from "./db-managers/carts.dao.manager.js";
import ProductManagerDB from "./db-managers/products.dao.manager.js";

import options from "../config/options.js";

const persistence= options.PERSISTENCE

let CartManager
let ProductManager

if (persistence==='mongo'){
CartManager= new CartManagerDB()
ProductManager= new ProductManagerDB()
}
else if (persistence==='file'){
     CartManager= new CartManagerFile()
   ProductManager= new ProductManagerFile()
}
else{
    throw new Error ('Persistencia desconocida.')
}
export{ CartManager, ProductManager }