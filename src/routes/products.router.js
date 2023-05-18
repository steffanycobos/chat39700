import { Router, json } from "express";
import { urlencoded } from "express";
import passport from "passport";
import session from "express-session";
import { getProductsController, addProductsController, getProductByIdController, updateProductController, deleteProductController} from "../controllers/products.controller.js";
import { authenticateAdmin } from "../controllers/users.controller.js";
const productsRouter = Router();



productsRouter.use(json());
productsRouter.use(urlencoded({ extended: true }));
productsRouter.get('/', getProductsController)
productsRouter.post('/',addProductsController)
productsRouter.get('/:pid', getProductByIdController )
productsRouter.put('/', updateProductController)
productsRouter.delete('/:pid', deleteProductController)




export default productsRouter;
