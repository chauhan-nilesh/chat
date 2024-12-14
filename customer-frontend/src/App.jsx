import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router";
import Loader from "../../frontend/src/components/Loader";
import { Helmet } from "react-helmet";

const socket = io(`${import.meta.env.VITE_API_URL}`); 

const App = () => {
    const [userData, setUserData] = useState({})
    const [userId, setUserId] = useState("");
    const [recipient, setRecipient] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    async function verifyCustomer() {
        const token = localStorage.getItem("customerToken")
        if (!token) {
            navigate("/login")
        } else {
            try {
                setLoading(true)
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/verify`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    const responseData = await response.json();
                    setUserId(responseData.data._id);
                    setRecipient(responseData.data.userId._id)
                    setUserData(responseData.data.userId)
                } else {
                    toast.error("Something went wrong")
                }

                const customerMsg = await fetch(`${import.meta.env.VITE_API_URL}/api/conversation/get-data`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        sender: userId,
                        recipient: recipient
                    })
                })

                if (customerMsg.ok) {
                    const customerMsgData = await customerMsg.json();
                    setMessages([...customerMsgData.data]); // Clear messages for the new chat
                } else {
                    setMessages([]);
                    toast.error("Something went wrong")
                }

            } catch (error) {
                console.log("something went wrong")
            }
        }
        setLoading(false)
    }

    useEffect(() => {

        verifyCustomer();

        // Authenticate user
        if (userId) {
            socket.emit("authenticate", userId);
        }

        // Listen for incoming messages
        socket.on("receiveMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => socket.off("receiveMessage");
    }, [userId]);

    // Scroll to the bottom of the messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); // Triggered whenever messages array is updated


    const sendMessage = () => {
        if (!message.trim()) return;
        socket.emit("sendMessage", { sender: userId, recipient, message });
        setMessages((prev) => [...prev, { sender: userId, message }]);
        setMessage("");
    };

    if (loading) return <Loader />

    return (
        <div className="flex flex-col max-w-lg mx-auto h-screen bg-white overflow-hidden shadow-lg rounded-xl">
            <Helmet>
                <title>{userData.name}</title>
                <meta name="description" content={userData.name} />
            </Helmet>
            <header className="flex justify-between items-center p-4 bg-opacity-90 bg-gray-100 shadow-md">
                <div className="flex items-center space-x-3">
                    <img
                        src={userData.dp ? userData.dp : "/profile.png"}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full shadow-md"
                    />
                    <h2 className="text-base lg:text-xl font-semibold text-gray-900">{userData.name}</h2>
                </div>
                <div className="flex items-center space-x-3">
                    <span className="w-4 h-4 bg-green-500 rounded-full shadow-md"></span>
                    <span className="text-gray-600 cursor-pointer">&#9881;</span>
                </div>
            </header>
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, index) => (
                    // Use 'key' only on the outermost element
                    msg.sender === userId ? (
                        <div key={index} className="flex flex-col items-end">
                            <div className="bg-gray-900 text-sm lg:text-base text-white rounded-2xl px-4 py-2 max-w-xs shadow-md relative">
                                {msg.message} {/* Assuming 'msg.message' contains the text */}
                            </div>
                        </div>
                    ) : (
                        <div key={index} className="flex flex-col items-start">
                            <div className="bg-white text-sm lg:text-base text-gray-800 border border-gray-300 rounded-2xl px-4 py-2 max-w-xs shadow-md relative">
                                {msg.message} {/* Assuming 'msg.message' contains the text */}
                            </div>
                        </div>
                    )
                ))}
                {/* Empty div to reference the bottom of the chat */}
                <div ref={messagesEndRef} />
            </div>

            <footer className="flex items-center p-4 bg-gray-100 bg-opacity-90">
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-900 focus:outline-none bg-white text-gray-900" />
                <button onClick={sendMessage} className="ml-3 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all">Send</button>
            </footer>
        </div>
    );
};

export default App;
