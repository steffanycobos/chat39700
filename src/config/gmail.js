import nodemailer from "nodemailer"
import options from "./options.js"

const adminEmail= options.ADMIN_EMAIL
const adminPassword= options.ADMIN_PASSWORD

export  const transporter= nodemailer.createTransport({
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

export const sendRecoveryPass = async(userEmail,token)=>{
    const link = `http://localhost:8080/reset-password?token=${token}`;

    await transporter.sendMail({
        from: adminEmail,
        to:userEmail,
        subject:"Restablece tu Contraseña",
        html:`
            <div>
                <h2>Solicitaste un cambio de contraseña</h2>
                <p>Da click en el siguiente enlace para restablecer tu contraseña.</p>
                <a href="${link}">
                    <button> Restablecer contraseña </button>
                </a>
            </div>
        `
    })
};