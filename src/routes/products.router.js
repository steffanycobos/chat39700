import { Router} from "express";
import { urlencoded } from "express";
import { getProductsController, addProductsController, getProductByIdController, updateProductController, deleteProductController,mockingController} from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/authenticate.js";



const productsRouter = Router();

productsRouter.use(urlencoded({ extended: true }));
productsRouter.get('/mockingproducts',mockingController)
productsRouter.get('/', getProductsController)
productsRouter.post('/add', checkRole(['premium'])  ,addProductsController)
productsRouter.get('/:pid', getProductByIdController )
productsRouter.put('/', checkRole(['admin']), updateProductController)
productsRouter.delete('/:pid', checkRole(['admin']), deleteProductController)


export default productsRouter;