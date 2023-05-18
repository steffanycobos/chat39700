import ticketsModel from "../models/tickets.models.js";
import CartManager from "./carts.dao.manager.js";

let cartManager= new CartManager()


class TicketManager{
    constructor(){}

    async newTicket(){
let purchase_datetime= new Date()
let cart= await cartManager.getCart()
 
console.log(purchase_datetime,cart)


       // let ticket=await ticketsModel.create(code,purchase_datetime,)
    }

}
export default TicketManager;