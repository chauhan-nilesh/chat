import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function CustomerRegister() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [userData, setUserData] = useState({
        userId: "",
        name: "",
        email: "",
        password: ""
    })

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({
            ...userData,
            [name]: value,
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...userData
            })
        })

        if (response.ok) {
            toast.success('Registered successfully');
            setUserData({
                userId: "",
                name: "",
                email: "",
                password: ""
            })
            navigate('/login');
        } else {
            toast.error('Something went wrong');
        }
        setLoading(false)
    };

    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <div className='h-screen w-full flex justify-center items-center'>
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-2xl font-bold mb-4 text-center">Customer Register</h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            type="text"
                            placeholder="User ID"
                            id="userId"
                            name="userId"
                            value={userData.userId}
                            onChange={handleInput}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            type="text"
                            placeholder="Name"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleInput}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInput}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInput}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 text-black font-semibold flex justify-center items-center h-10 rounded-md hover:bg-yellow-600"
                        >
                            {loading ? <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div> : "Register"}
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-yellow-500 underline hover:text-yellow-600"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default CustomerRegister;