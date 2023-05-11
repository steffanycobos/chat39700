import { Router, json } from "express";
import { urlencoded } from "express";
import { getProductsController, addProductsController, getProductByIdController, updateProductController, deleteProductController, ordenPriceController} from "../controllers/products.controller.js";


const productsRouter = Router();

productsRouter.use(json());
productsRouter.use(urlencoded({ extended: true }));
productsRouter.get('/',getProductsController)
productsRouter.post('/',addProductsController)
productsRouter.get('/:pid', getProductByIdController )
productsRouter.put('/', updateProductController)
productsRouter.delete('/:pid', deleteProductController)
productsRouter.get("/orden/:ord", ordenPriceController)



export default productsRouter;
