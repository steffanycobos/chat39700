<<<<<<< HEAD
import nodemailer from "nodemailer"
import options from "./options.js"

const adminEmail= options.ADMIN_EMAIL_GMAIL
const adminPassword= options.ADMIN_PASSWORD_GMAIL


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
=======
import nodemailer from "nodemailer"
import options from "./options.js"

const adminEmail= options.ADMIN_EMAIL_GMAIL
const adminPassword= options.ADMIN_PASSWORD_GMAIL


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
>>>>>>> 30f199008ec74a8bf280b47cdbb52c0d387c238b
export default transporter