import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema({
  participants: [String], // Array of user IDs
  messages: [messageSchema], // Array of message objects
});

const conversations = mongoose.model("conversations", conversationSchema);

export default conversations;