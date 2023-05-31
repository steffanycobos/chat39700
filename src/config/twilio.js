
import twilio from "twilio";
import options from "./options.js"

const twilioID= options.TWILIO_ID
const twilioToken= options.TWILIO_TOKEN
export const  twilioPhone= options.TWILIO_PHONE

export const twilioClient = twilio(twilioID,twilioToken);