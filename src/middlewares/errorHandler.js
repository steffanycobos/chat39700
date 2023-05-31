<<<<<<< HEAD
import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next)=>{
    switch (error.code) {
        case EError.INVALID_JSON:
            res.json({status:"error", error:error.cause, message: error.message})
            break;
        case EError.DATABASE_ERROR:
            res.json({status:"error", error:error.message})
            break;
        case EError.INVALID_PARAM:
            res.json({status:"error", error:error.cause})
            break;
        default:
            res.json({status:"error", message:"Hubo un error, contacte al equipo de soporte"})
            break;
    }
=======
import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next)=>{
    switch (error.code) {
        case EError.INVALID_JSON:
            res.json({status:"error", error:error.cause, message: error.message})
            break;
        case EError.DATABASE_ERROR:
            res.json({status:"error", error:error.message})
            break;
        case EError.INVALID_PARAM:
            res.json({status:"error", error:error.cause})
            break;
        default:
            res.json({status:"error", message:"Hubo un error, contacte al equipo de soporte"})
            break;
    }
>>>>>>> 30f199008ec74a8bf280b47cdbb52c0d387c238b
}