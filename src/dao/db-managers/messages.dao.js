import messagesModel from "../models/message.models.js";

class ChatManager {
  async getMessages() {
    try {
      const messages = await messagesModel.find().lean();
      return { stat: 200, result: messages };
    } catch (error) {
      return { stat: 400, result: "Error!" };
    }
  }

  async newMessage(message) {
    try {
      const result = await messagesModel.create(message);
      const messages = await this.getMessages();
      return { stat: 200, result: messages };
    } catch (error) {
      return { stat: 400, result: "Error!" };
    }
  }
}

export default ChatManager;