import fs from "fs";
import __dirname from "../../utils.js";



class ProductManager {
  #path;
  constructor(path) {
    this.#path = path;
  }

  
  async getProducts() {
    //Obtener productos
    try {
      const products = await fs.promises.readFile(this.#path,'utf-8');
      return JSON.parse(products);
    } catch (e) {
      return [];
    }
  
  }
  
  async addProducts(title, description, price, code, stock,category) {
    //Agregar producto sin repetir el code
    const prod = await this.getProducts();
    const newProduct = {
      title,
      description,
      price,
      code,
      stock,
      category
    };
    let cd = prod.find((x) => x.code ===code);
  
    if (!cd) { 
      await  fs.promises.writeFile(this.#path, JSON.stringify([...prod, newProduct]))
      console.log("Producto agregado!")
      return   ([...prod, newProduct])
      
    } else {
      throw new Error(`El código ${code} ya esta registrado.`);
    }
  }
  async getProductById(id) {
    // Producto por ID
    const prod = await this.getProducts()
    let element = prod.find((x) => x.id === id);
    if (element) {
      //fs.promises.appendFile(`Producto con ID ${id}: ${JSON.stringify(element)}`)
      return element;
    } else {
      return `<h2>Product with ID: ${id} Not Found</h2>`;
    }
  }

  async updateProduct(id, title, description, price, code, stock,category) {
    // Actualiza producto
    let actual = [];
    const prod = await this.getProducts();
    actual = prod.find((x) => x.id === id);
if(!actual){
  throw new Error(`El id: ${id} no existe.`)
}
    if (title === undefined) {
      title = prod[id - 1].title;
    } else {
      actual.title = title;
    }
    if (description === undefined) {
      title = prod[id - 1].description;
    } else {
      actual.description = description;
    }
    if (price === undefined || price !== Number) {
      price = prod[id - 1].price;
    } else {
      actual.price = price;
    }
    
    if (code === undefined) {
      code = prod[id - 1].code;
    } else {
      actual.code = code;
    }
    if (stock === undefined || stock !== Number) {
      stock = prod[id - 1].stock;
    } else {
      actual.stock = stock;
    }
    if (category === undefined ) {
      category = prod[id - 1].stock;
    } else {
      actual.category = category;
    }
    fs.promises.writeFile(
      this.#path,
      JSON.stringify(prod)
      );
      return (prod)
  }

  async deleteProduct(id) {
    // Elimina producto por ID
    const prod = await this.getProducts();
    let checkId = prod.find((x) => x.id === id);
    if (checkId) {
      let rest = prod.filter((x) => x.id !== id);
      fs.promises.writeFile(this.#path, JSON.stringify(rest));
      return JSON.stringify(rest)
    } else {
      throw new Error(` No se encuentra ningún objeto con id: ${id}`);
    }
  }
}


export default ProductManager;