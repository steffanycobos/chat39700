<<<<<<< HEAD
import { Router, json } from "express";
import { urlencoded } from "express";
import { getProductsController, addProductsController, getProductByIdController, updateProductController, deleteProductController,mockingController} from "../controllers/products.controller.js";
//import { authenticateAdmin } from "../controllers/users.controller.js";
import { checkRole } from "../controllers/users.controller.js";
import { generateProducts,madeProduct} from "../utils.js";

const productsRouter = Router();

productsRouter.use(json());
productsRouter.use(urlencoded({ extended: true }));
productsRouter.get('/mockingproducts',mockingController)
productsRouter.get('/',getProductsController)
productsRouter.post('/',addProductsController)
productsRouter.get('/:pid', getProductByIdController )
productsRouter.put('/', updateProductController)
productsRouter.delete('/:pid', deleteProductController)


=======
import { Router, json } from "express";
import { urlencoded } from "express";
import { getProductsController, addProductsController, getProductByIdController, updateProductController, deleteProductController,mockingController} from "../controllers/products.controller.js";
import { authenticateAdmin } from "../controllers/users.controller.js";
import {checkRole, isUserAuthenticate} from "../middlewares/authenticate.js"
import { generateProducts,madeProduct} from "../utils.js";

const productsRouter = Router();

productsRouter.use(json());
productsRouter.use(urlencoded({ extended: true }));
productsRouter.get('/mockingproducts',mockingController)
productsRouter.get('/', getProductsController)
productsRouter.post('/',addProductsController)
productsRouter.get('/:pid', getProductByIdController )
productsRouter.put('/', updateProductController)
productsRouter.delete('/:pid', deleteProductController)


>>>>>>> 30f199008ec74a8bf280b47cdbb52c0d387c238b
export default productsRouter;