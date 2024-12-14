import React from "react";
import ContactItem from "./ContactItem";

const Sidebar = ({ activeChats, onContactSelect }) => {
    return (
        <div className="sidebar w-1/4 bg-gray-900 text-white h-screen">
            <div className="bg-slate-900 px-4 py-5 flex justify-between items-center">
                <h3 className="text-xl font-bold">SureChat</h3>
                <span className="text-gray-600 cursor-pointer text-2xl">&#9881;</span>
            </div>
            <div className="px-4">
                <input
                    type="text"
                    placeholder="Search people"
                    className="p-2 w-full rounded bg-gray-800 text-sm"
                />
            </div>
            <div className="contacts mt-4 px-4">
                <h3 className="text-xs text-gray-500">Chats</h3>
                <div className="contact-list mt-2">
                    {activeChats.map((chat) => (
                        <ContactItem key={chat.id} chat={chat} onClick={onContactSelect} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
