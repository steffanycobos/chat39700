import nodemailer from "nodemailer"
import options from "./options.js"

const adminEmail= options.ADMIN_EMAIL
const adminPassword= options.ADMIN_PASSWORD

const transporter= nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 587,
    auth:{
        user: adminEmail,
       pass:adminPassword
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
})

export default transporter;