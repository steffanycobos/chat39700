import ticketsModel from "../models/tickets.models.js";



export async function newTicket(data){
    let ticket= await ticketsModel.create(data)
    return ticket
}