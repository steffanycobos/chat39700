import { Router, json } from "express";
import ProductManager from "../dao/db-managers/products.dao.manager.js";
import { getProductsController, addProductsController, getProductByIdController, updateProductController, deleteProductController} from "../controllers/products.controller.js";
import productsModel from "../dao/models/products.models.js";
//import ProductManager from "../dao/files-manager/productManager.js";

const productsRouter = Router();
const manager = new ProductManager();
//let manager = new ProductManager(__dirname+"/dao/files-manager/files/productos.json");

productsRouter.use(json());
productsRouter.get('/',getProductsController)
productsRouter.post('/',addProductsController)
productsRouter.get('/:pid', getProductByIdController )
productsRouter.put('/', updateProductController)
productsRouter.delete('/:pid', deleteProductController)
/*
//OBTIENE LA CANTIDAD DE PRODUCTOS QUE PASE EL LIMIT
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
/// Obtiene productos segun el query pasado(title,stock,price)
productsRouter.get("/title", async (req, res) => {
  let { title } = req.query;
  const filter = await manager.getProductsByQueryTitle(title);
  res.send({ status: "ok", payload: filter });
});
productsRouter.get("/stock", async (req, res) => {
  let { stock } = req.query;
  const filter1 = await manager.getProductsByQueryStock(Number(stock));
  res.send({ status: "ok", payload: filter1 });
});
productsRouter.get("/price", async (req, res) => {
  let { price } = req.query;
  console.log(price);
  const filter2 = await manager.getProductsByQueryPrice(Number(price));
  res.send({ status: "ok", payload: filter2 });
});
/////
//PAGINACION, 2 POR PAG
productsRouter.get("/page", async (req, res) => {
  const { page } = req.query;
  if (page===null){
    page=1
  }
  const products = await productsModel.paginate(
    {},
    {
      limit: 2,
      lean: true,
      page: page ?? 1,
    }
  );
  console.log(products);
  res.render("home", { products });
});

//Ordena de forma ascendente o descendente segun el precio
productsRouter.get("/orden/:ord", async (req, res) => {
  let num = req.params.ord;
  if (num === "asc") {
    const products = await manager.ordenPrice(1);
    res.send({ status: "ok", payload: products });
  } else if (num === "desc") {
    const products = await manager.ordenPrice(-1);
    res.send({ status: "ok", payload: products });
  } else {
    res.send({ status: "ok", payload: await manager.getProducts() });
  }
});

//Producto por ID
productsRouter.get("/:pid", async (req, res) => {
  let num = req.params.pid;
  const products = await manager.getProductById(num);
  res.send({ status: "ok", payload: products });
});


//Agrega producto
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


//Actualiza Producto
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

//Elimina Producto
productsRouter.delete("/:pid", async (req, res) => {
  let pid = req.params.pid;
  const deleteProduct = await manager.deleteProduct(pid);
  res.send({ status: "ok", payload: deleteProduct + "Producto eliminado." });
});*/

export default productsRouter;
