import { getProductByIdService, getProductsService, addProductsService,updateProductService, deleteProductService
 } from "../service/products.service.js";

 export  const getProductsController= async (req,res)=>{
    let products= await getProductsService()
    console.log(products, typeof products)
res.json({status:'success',data:products})
}

export  const addProductsController= async(res,req)=>{
    console.log(req.body)
    let { title, description, price, thumbnail, code, stock }= req.body
    let newProduct= await addProductsService(title, description, price, thumbnail, code, stock)
    res.json({status:"success", payload:newProduct})
}

export const getProductByIdController= async(res,req)=>{
    let id= req.params.pid
    let product= await getProductByIdService(id)
    res.json({status:"success", payload:product})
}

export const updateProductController= async(req,res)=>{
    const {id, title, description, price, thumbnail, code, stock}=req.body
    let product= await updateProductService(id, title, description, price, thumbnail, code, stock)
    res.json({status:"success", payload:product})
}
export const deleteProductController= async(res,req)=>{
    let id= req.params.pid
    let product= await deleteProductService(id)
    res.json({status:"success", payload:product})
}

