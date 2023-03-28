import { Router, json } from "express";
import ProductManager from "../dao/db-managers/products.dao.manager.js";
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
