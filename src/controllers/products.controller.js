import { getProductByIdService, getProductsService, addProductsService,updateProductService, deleteProductService
 , ordenPriceService} from "../service/products.service.js";
 import { EError } from "../enums/EError.js";
 import { CustomError, generateUserErrorInfo } from "../service/constumError.service.js";
import { generateProducts } from "../utils.js";

 export  const getProductsController= async (req,res)=>{
try {
    const products = await getProductsService();
    const { limit } = await req.query;

    if (limit) {
      products.length = limit;
      return res.send(products);
    } else {
      res.send({ status: "ok", payload: products });
    }
  } catch (e) {
    res.status(404).send(`${e}`);
  }
}

export  const addProductsController= async(req,res)=>{
 let { title, description, price, thumbnail, code, stock }= req.body
    
   if( !title || !price ){
  CustomError.createError({
    name:'Error por usuario',
    cause:  generateUserErrorInfo(req.body),
    message: "Error creando nuevo producto.",
    errorCode:EError.INVALID_JSON
  })
    }
    let newProduct= await addProductsService(title, description, price, thumbnail, code, stock)
    res.json({status:"success", payload:newProduct})
}

export const getProductByIdController= async(req,res)=>{
    let pid= req.params.pid
    let product= await getProductByIdService(pid)
    res.json({status:"success", payload:product})
}

export const updateProductController= async(req,res)=>{
    const {id, title, description, price, thumbnail, code, stock}=req.body
    let product= await updateProductService(id, title, description, price, thumbnail, code, stock)
    res.json({status:"success", payload:product})
}
export const deleteProductController= async(req,res)=>{
    let id= req.params.pid
    let product= await deleteProductService(id)
    res.json({status:"success", payload:product})
}

export const ordenPriceController=async(req,res)=>{
    let num = req.params.ord;
    if (num === "asc") {
      const products = await ordenPriceService(1);
      res.send({ status: "ok", payload: products });
    } else if (num === "desc") {
      const products = await ordenPriceService(-1);
      res.send({ status: "ok", payload: products });
    } else {
        res.send({ status: "ok", payload: await getProductsService() });
  }}

export const mockingController= async(req,res)=>{
  let products=  generateProducts()
  res.send({ status: "ok", payload: products })
}