import { Router, json } from "express";
import { urlencoded } from "express";
import TicketManager from "../dao/db-managers/tickets.dao.manager.js";

let manager= new TicketManager()
const ticketsRouter = Router();

ticketsRouter.use(urlencoded({ extended: true }));
ticketsRouter.get('/ticket', async(req,res)=>{
    let ticket= await manager.newTicket()
    res.send(ticket)
})

export default ticketsRouter