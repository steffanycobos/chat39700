<<<<<<< HEAD
import twilio from "twilio";
import options from "./options.js"

const twilioID= options.TWILIO_ID
const twilioToken= options.TWILIO_TOKEN
export const  twilioPhone= options.TWILIO_PHONE
=======
import twilio from "twilio";
import options from "./options.js"

const twilioID= options.TWILIO_ID
const twilioToken= options.TWILIO_TOKEN
export const  twilioPhone= options.TWILIO_PHONE
>>>>>>> 30f199008ec74a8bf280b47cdbb52c0d387c238b
export const twilioClient = twilio(twilioID,twilioToken);