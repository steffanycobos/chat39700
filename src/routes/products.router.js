import { Router, json } from "express";
import { urlencoded } from "express";
import { getProductsController, addProductsController, getProductByIdController, updateProductController, deleteProductController,mockingController} from "../controllers/products.controller.js";
import { checkRole } from "../controllers/users.controller.js";



const productsRouter = Router();

productsRouter.use(urlencoded({ extended: true }));
productsRouter.get('/mockingproducts',mockingController)
productsRouter.get('/',checkRole('admin'),getProductsController)
productsRouter.post('/',addProductsController)
productsRouter.get('/:pid', getProductByIdController )
productsRouter.put('/', updateProductController)
productsRouter.delete('/:pid', deleteProductController)


export default productsRouter;