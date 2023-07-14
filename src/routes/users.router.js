import {Router} from "express";
import {currentUserController,uploadDocumentsController} from "../controllers/users.controller.js";
import { uploaderDocuments } from "../utils.js";
import { changeRoleService } from "../service/users.service.js";

const usersRouter = Router();


usersRouter.put("/premium/:uid",changeRoleService)//CHANGE ROL
usersRouter.put("/:uid/documents", uploaderDocuments.fields([{name:"identificacion",maxCount:1}, {name:"domicilio",maxCount:1},{name:"estadoDeCuenta",maxCount:1}]), uploadDocumentsController)
usersRouter.get("/current", currentUserController); //CURRENT USER



export default usersRouter;