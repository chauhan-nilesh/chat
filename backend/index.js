import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import conversations from "./models/conversation.model.js";
import dbConnect from "./db/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config()

// Create an Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("hello world")
})

// In-memory store for active users
const activeUsers = new Map();

// WebSocket Events
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle authentication
  socket.on("authenticate", (userId) => {
    activeUsers.set(userId, socket);
    console.log(`User ${userId} connected`);
  });

  // Handle sending messages
  socket.on("sendMessage", async ({ sender, recipient, message }) => {
    const timestamp = new Date();

    // Save the message to MongoDB
    let conversation = await conversations.findOne({
      participants: { $all: [sender, recipient] },
    });

    if (!conversation) {
      conversation = new conversations({ participants: [sender, recipient], messages: [] });
    }

    conversation.messages.push({ sender, recipient, message, timestamp });
    await conversation.save();

    // Send message to the recipient if they are online
    const recipientSocket = activeUsers.get(recipient);
    if (recipientSocket) {
      recipientSocket.emit("receiveMessage", { sender, recipient, message, timestamp });
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    for (const [userId, userSocket] of activeUsers.entries()) {
      if (userSocket === socket) {
        activeUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

//api
import { userRouter } from "./routes/user.router.js";
import { conversationRouter } from "./routes/conversation.router.js";
import { customerRouter } from "./routes/customer.router.js";

app.use("/api/user", userRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/customer", customerRouter);

// Start server
dbConnect()
  .then(() => {
    server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((error) => {
    console.log("Something went wrong", error)
  })
