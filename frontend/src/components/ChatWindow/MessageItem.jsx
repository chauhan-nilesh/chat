import React from "react";

const MessageItem = ({ message, senderId, selectedChat }) => {
  if (selectedChat.id === message.sender || selectedChat.id === message.recipient) {
    return (
      <div className={`message ${message.sender === senderId ? "text-left" : "text-right"}`}>
        <p
          className={`mt-1 inline-block px-4 py-2 rounded-full ${message.sender === senderId ? "bg-gray-200 text-gray-900" : "bg-gray-900 text-white"
            }`}
        >
          {message.message}
        </p>
      </div>
    );
  } else {
    return null
  }
};

export default MessageItem;
