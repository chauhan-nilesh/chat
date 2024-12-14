import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Sidebar from "./components/Sidebar/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import ChatWindow from "./components/ChatWindow/ChatWindow"
import ContactItem from "./components/Sidebar/ContactItem";
import ChatMobile from "./components/ChatWindow/ChatMobile";
import Loader from "./components/Loader";
import BottomNavbar from "./components/BottomNavbar";

const socket = io("http://localhost:3000");

function App() {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const navigate = useNavigate()

  async function verifyUser() {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token
        })
      })
      if (response.ok) {
        const responseData = await response.json();
        setUserId(responseData.data._id);
        setUserData(responseData.data)
        const formattedData = responseData.data.customers.map(item => ({
          ...item,
          id: item._id // Copy all properties and overwrite `id`
        }));
        setActiveChats(formattedData)
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log("something went wrong")
    }
    setLoading(false)
  }

  useEffect(() => {

    verifyUser();

    // Authenticate the user when userId changes
    if (userId) {
      socket.emit("authenticate", userId);
    }

    // setActiveChats([
    //   { id: "675af2f14603bcce15e43644", name: "nileshchauhan5911@gmail.com", avatar: "avatar1.png", status: "Online" },
    //   { id: "675af3e72892648b0eb2ddc4", name: "hello@hello.com", avatar: "avatar1.png", status: "Online" },
    //   // Add more active chats
    // ])

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      console.log(data)
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, [userId]);


  const handleContactSelect = async (contact) => {
    setSelectedChat(contact);
    try {
      setChatLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/conversation/get-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender: contact.id,
          recipient: userId
        })
      })
      if (response.ok) {
        const responseData = await response.json();
        setMessages([...responseData.data]); // Clear messages for the new chat
      } else {
        setMessages([]);
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log("something went wrong")
    }
    setChatLoading(false)
  };

  const sendMessage = (message) => {
    if (!message.trim()) return;
    setMessage(message)

    socket.emit("sendMessage", {
      sender: userId,
      recipient: selectedChat.id,
      message,
    });

    setMessages((prev) => [...prev, { sender: userId, recipient: selectedChat.id, message }]);
    setMessage("");
  };
  // console.log(messages)

  if (loading) return <Loader />

  return (
    <>
      <div className="lg:flex hidden">
        <Sidebar
          activeChats={activeChats}
          onContactSelect={handleContactSelect}
          userId={userId}
          setUserId={setUserId}
        />
        {chatLoading ?
          <div className="w-3/4 h-screen flex items-center justify-center bg-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-black rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-4 h-4 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          : selectedChat ? (
            <ChatWindow
              selectedChat={selectedChat}
              messages={messages}
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          ) : (
            <div className="w-3/4 h-screen flex items-center justify-center bg-gray-100">
              <h2>Select a contact to start chatting</h2>
            </div>
          )}
      </div>

      {/* mobile view */}
      <div className={`${selectedChat ? "hidden" : "w-screen h-screen"} lg:hidden bg-white text-black`}>
        <div className="bg-white text-slate-950 px-4 py-5">
          <h3 className="text-xl font-bold">SureChat</h3>
        </div>
        <div className="px-4">
          <input
            type="text"
            placeholder="Search people"
            className="p-2 w-full rounded bg-gray-100 text-sm"
          />
        </div>
        <div className="contacts mt-4 px-4">
          <h3 className="text-xs text-gray-500">Chats</h3>
          <div className="contact-list mt-2">
            {activeChats.map((chat) => (
              <div key={chat.id}
                className="bg-white text-black flex items-center py-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleContactSelect(chat)}
              >
                <img src={chat.dp ? chat.dp : "/profile.png"} alt="" className="w-8 h-8 rounded-full" />
                <div className="ml-2">
                  <h4 className="text-sm">{chat.name}</h4>
                  <p className="text-xs text-gray-400">{chat.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedChat && <ChatMobile selectedChat={selectedChat} messages={messages} sendMessage={sendMessage} />}
      {!selectedChat && <BottomNavbar />}
    </>
  );
}

export default App;
