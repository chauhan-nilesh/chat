import React from "react";
import MessageItem from "./MessageItem";
import { useRef } from "react";
import { useEffect } from "react";

const ChatWindow = ({ selectedChat, messages, sendMessage }) => {
  const [message, setMessage] = React.useState("");
  const messagesEndRef = useRef(null); // Reference to the end of the messages
  
  // Scroll to the bottom of the messages
  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
}, [messages]); // Triggered whenever messages array is updated

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };
  // console.log(messages)

  return (
    <div data-theme="light" className="chat-window w-3/4 h-screen flex flex-col">
      <div className="chat-header flex items-center p-4 bg-gray-200">
        <img src={selectedChat.avatar ? selectedChat.avatar : "/profile.png"} alt="" className="w-10 h-10 rounded-full" />
        <div className="ml-2">
          <h4 className="text-md font-semibold">{selectedChat.name}</h4>
          <p className="text-xs text-gray-500">{selectedChat.position}</p>
        </div>
      </div>
      <div className="chat-body flex-1 p-4 overflow-y-auto bg-white">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} senderId={selectedChat.id} selectedChat={selectedChat}/>
        ))}

        {/* Empty div to reference the bottom of the chat */}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-footer p-4 bg-gray-100 flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-900 focus:outline-none bg-white text-gray-900"
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
