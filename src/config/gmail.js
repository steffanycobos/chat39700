
import nodemailer from "nodemailer"
import options from "./options.js"

const adminEmail= options.ADMIN_EMAIL_GMAIL
const adminPassword= options.ADMIN_PASSWORD_GMAIL

function transporter(){ nodemailer.createTransport({
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
})}

export default transporter;