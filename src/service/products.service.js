import ProductManager from "../dao/db-managers/products.dao.manager.js"

let manager= new ProductManager();

export async function getProductsService(){
    let products= await manager.getProducts()
    return products
}

export async function addProductsService(title, description, price, thumbnail, code, stock){
    let newProduct= await manager.addProducts(title, description, price, thumbnail, code, stock)
     return newProduct
}

export async function getProductByIdService(id){
    let product= await manager.getProductById(id)
    return product;
}

export async function updateProductService(id, title, description, price, thumbnail, code, stock){
    let product= await manager.updateProduct(id, title, description, price, thumbnail, code, stock)
    return product;
}

export async function deleteProductService(id){
    let productDelete= await manager.deleteProduct(id)
    return productDelete;
}
