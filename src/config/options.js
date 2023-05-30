import dotenv from "dotenv";

dotenv.config();

export default { PORT:process.env.PORT,
 MONGO_URL:process.env.MONGO_URL,
 ADMIN_EMAIL:process.env.ADMIN_EMAIL,
ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
ADMIN_EMAIL_GMAIL: process.env.ADMIN_EMAIL_GMAIL,
ADMIN_PASSWORD_GMAIL: process.env.ADMIN_PASSWORD_GMAIL,
TWILIO_ID: process.env.TWILIO_ID,
TWILIO_TOKEN: process.env.TWILIO_TOKEN,
TWILIO_PHONE: process.env.TWILIO_PHONE,
 PERSISTENCE: process.env.PERSISTENCE,
productsFileName: "productos.json",
 cartsFileName: "carts.json",
}