import { getProductByIdService, getProductsService, addProductsService,updateProductService, deleteProductService
 , ordenPriceService, getProductsByQueryTitleService,getProductsByQueryPriceService,getProductsByQueryStockService} from "../service/products.service.js";

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

export const getProductsByQueryTitleController= async(req,res)=>{
    let { title }= await req.query;
    console.log(title, 'Controller')
    /*let product=  await getProductsByQueryTitleService(title)
    res.send({ status: "ok", payload: product});*/
}

export const getProductsByQueryPriceController= async(req,res)=>{
    let { price } = req.query;
    console.log(price, 'Controller')
    res.send({ status: "ok", payload:  await getProductsByQueryPriceService(price) });
}
export const getProductsByQueryStockController= async(req,res)=>{
    let { stock } = req.query;
    console.log(stock, 'Controller')
    res.send({ status: "ok", payload:  await getProductsByQueryStockService(stock) });
};