import React from "react";

const ContactItem = ({ chat, onClick }) => {
  return (
    <div
      className="contact flex items-center py-3 hover:bg-gray-800 cursor-pointer"
      onClick={() => onClick(chat)}
    >
      <img src={chat.dp ? chat.dp : "/profile.png"} alt="" className="w-8 h-8 rounded-full" />
      <div className="ml-2">
        <h4 className="text-sm">{chat.name}</h4>
        <p className="text-xs text-gray-400">{chat.status}</p>
      </div>
    </div>
  );
};

export default ContactItem;
