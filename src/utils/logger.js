import winston from "winston";
import * as dotenv from "dotenv";
import __dirname from "../utils.js";
import path from "path";

dotenv.config();


const costumLevels={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    },
    colors:{
        fatal:"red",
        error:"orange",
        warn:"yellow",
        info:"blue",
        http:"green",
        debug:"purple",
      
    }
}

const devLogger= winston.createLogger({
    levels:costumLevels.levels,
    transports:[
        new winston.transports.Console({level:"debug"}),
        new winston.transports.File({filename:path.join(__dirname,'/logs/errors.log'),level:"info"})
    ]

})

const prodLogger= winston.createLogger({
    transports:[
        new winston.transports.Console({level:"info"}),
        new winston.transports.File({filename:path.join(__dirname,'/logs/errors.log'),level:"info"})
    ]
})

const currentEnv = process.env.NODE_ENV || "development";

export const addLogger = (req,res,next)=>{
    if(currentEnv === "development"){
        req.logger = devLogger
    } else {
        req.logger = prodLogger
    }
    req.logger.http(`${req.url} - method: ${req.method}`);
    next();
}