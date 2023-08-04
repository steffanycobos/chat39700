import { getProductByIdService, getProductsService, addProductsService,updateProductService, deleteProductService} from "../service/products.service.js";
import { EError } from "../enums/EError.js";
import { transporter } from "../config/gmail.js";
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
      res.render("products", { products });
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
  })}
    let newProduct= await addProductsService(title, description, price, thumbnail, code, stock)
    newProduct.owner= req.user._id
    newProduct.save()
    res.json({status:"success", payload:newProduct})
    return newProduct
}

export const getProductByIdController= async(req,res)=>{
    let pid= req.params.pid
    let product= await getProductByIdService(pid)
    if( product== undefined){
      res.send('No existe producto con ese id')
    }else{
    res.json({status:"success", payload:{product}})
}
}
export const updateProductController= async(req,res)=>{
  try{
    const pid= req.params.pid
    const {title, description, price, thumbnail, code, stock}=req.body   
    let product= await updateProductService(pid, title, description, price, thumbnail, code, stock)
    product.save()
    res.json({status:"success", payload:product})}
    catch(err){
      res.send({status: 'error',payload:err})

    }
}
/// ENVIA EMAIL DE PRODUCTO ELIMINADO
export async function deleteProductEmail(email) {
  const emailTemplate = `<div>
        <h1>Producto Eliminado!</h1> 
        <p>Eliminaste productos de tu carrito</p>
        <img width="100px" src="cid:mono" />
</div>`;
  try {
    const data = await transporter.sendMail({
      from: "Prueba CoderHouse Steffany Cobos",
      to: email,
      subject: "Eliminaste productos de tu carrito!",
      html: emailTemplate,
    });
  } catch (error) {
    console.log(error);
  }
}

export const deleteProductController= async(req,res)=>{

    let id= req.params.pid
    let productId= await getProductByIdService(id)
 
    if(productId){
    const productOwner = JSON.stringify(productId[0].owner)
    const userId = JSON.stringify(req.user._id)
      if((req.user.rol === "premium" && productOwner === userId) || (req.user.rol === "admin")){
        let product= await deleteProductService(id)
        res.json({status:"success", payload:product})
    
      }else if(req.user.rol==='premium'){
        deleteProductEmail(req.user.email)
      } else {
          res.json({status:"error", message:"No estas autorizado para eliminar este producto."})
      }
  } else {
      return res.json({status:"error", message:"El producto no existe"});
  }
}


export const mockingController= async(req,res)=>{
  try{
    let products= generateProducts()
    res.send({ status: "ok", payload: products })
  
  } catch (err){
  res.send({message:err})
  }
}