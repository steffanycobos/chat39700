<<<<<<< HEAD
import { ProductManager } from "../dao/factory.js";

let manager= ProductManager
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

export async function ordenPriceService(num){
    const orden= await manager.ordenPrice(num)
    return orden
}

export async function getProductsByQueryTitleService(data){
    const products= await manager.getProductsByQueryTitle(data)
    console.log(products, 'Service')
    return products
}

export async function getProductsByQueryPriceService(data){
    const products= await manager.getProductsByQueryPrice(data)
    return products
}

export async function getProductsByQueryStockService(data){
    const product= await manager.getProductsByQueryStock(data)
    return product
=======
import { ProductManager } from "../dao/factory.js";

let manager= ProductManager
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

export async function ordenPriceService(num){
    const orden= await manager.ordenPrice(num)
    return orden
}

export async function getProductsByQueryTitleService(data){
    const products= await manager.getProductsByQueryTitle(data)
    console.log(products, 'Service')
    return products
}

export async function getProductsByQueryPriceService(data){
    const products= await manager.getProductsByQueryPrice(data)
    return products
}

export async function getProductsByQueryStockService(data){
    const product= await manager.getProductsByQueryStock(data)
    return product
>>>>>>> 30f199008ec74a8bf280b47cdbb52c0d387c238b
}