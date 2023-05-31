
import { getCartService, addCartService, checkCartService,addProductToCartService,deleteProductService,deleteProductsInCartService,updateQuantityService, ticketCartService  } from "../service/carts.service.js";


export const getCartController= async(req,res)=>{
    let cart= await getCartService()
    res.json({status:"success",payload: cart})
}

export const addCartController= async(req,res)=>{

    const result= await addCartService()
    res.status(201).send({ status: "ok", payload: result });
}

export const checkCartController= async(req,res)=>{
    let cid = (req.params.cid);
    let cart = await checkCartService(cid);
    res.send({status:'ok',payload: cart});
}

export const addProductToCartController= async(req,res)=>{
    let cid =(req.params.cid);
  let pid =(req.params.pid);
  let cart = await addProductToCartService(cid, pid);
  res.send({status:'ok',payload:cart}); 
}

export const deleteProductsInCartController= async(req,res)=>{
    let cid =(req.params.cid);
    const cart= await deleteProductsInCartService(cid)
    res.send({status:'ok',payload: cart})
}

export const deleteProductController = async(req,res)=>{
    let cid =(req.params.cid);
    let pid =(req.params.pid);
    let products= await deleteProductService(cid,pid)
    res.send({status:'ok',payload:products})
}

export const updateQuantityController= async(req,res)=>{
    let cid =(req.params.cid);
    let pid= req.params.pid
    const{quantity}= req.body
    let cart= await updateQuantityService(cid,pid,quantity)
  res.send({status:'ok',payload:cart})
}

export const ticketCartController= async(req,res)=>{
    let cid= req.params.cid
    let cart= await ticketCartService(cid)
    res.send({status:'ok',payload:cart})}
