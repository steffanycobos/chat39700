import { Router, json } from "express";
import ProductManager from "../dao/db-managers/products.dao.manager.js";
import productsModel from "../dao/models/products.models.js";
//import ProductManager from "../dao/files-manager/productManager.js";

const productsRouter = Router();
const manager = new ProductManager();
//let manager = new ProductManager(__dirname+"/dao/files-manager/files/productos.json");

productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts();
    const { limit } = req.query;

    if (limit) {
      products.length = limit;
      return res.send(products);
    } else {
      res.send({ status: "ok", payload: products });
    }
  } catch (e) {
    res.status(404).send(`${e}`);
  }
});

productsRouter.get("/filter",async (req,res)=>{
const{query}= req.query
let {dato}=req.query
console.log((query),dato, typeof dato, typeof query)
const filter= await manager.getProductsByQuery(query,dato)
res.send({status:'ok',payload:filter})
})
productsRouter.get("/page", async (req, res) => {
  const { page } = req.query;

  const products = await productsModel.paginate(
    {},
    {
      limit: 2,
      lean: true,
      page: page ?? 1,
    }
  );
console.log(products)
  res.render("home", { products });
});

productsRouter.get("/orden/:ord", async (req, res) => {
  let num=(req.params.ord)
  if(num==='asc'){
  const products= await manager.ordenPrice(1)
  res.send({status:'ok',payload: products})}
  else if(num==='desc'){
    const products= await manager.ordenPrice(-1)
    res.send({status:'ok',payload: products})
  }
  else{
    res.send({status:'ok',payload: await manager.getProducts()})
  }
})

productsRouter.get("/:pid", async (req, res) => {
  let num = req.params.pid;
  const products = await manager.getProductById(num);
  res.send({ status: "ok", payload: products });
});


productsRouter.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;

  const newProd = await manager.addProducts(
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  );
  res.send({ status: "ok", payload: newProd });
});

productsRouter.put("/:pid", async (req, res) => {
  let pid = req.params.pid;
  const { title, description, price, thumbnail, code, stock } = req.body;
  const updated = await manager.updateProduct(
    pid,
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  );

  res.send({ status: "ok", payload: updated });
});

productsRouter.delete("/:pid", async (req, res) => {
  let pid = req.params.pid;
  const deleteProduct = await manager.deleteProduct(pid);
  res.send({ status: "ok", payload: deleteProduct + "Producto eliminado." });
});

export default productsRouter;
