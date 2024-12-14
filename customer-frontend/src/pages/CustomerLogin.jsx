import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import Header from '../components/Header';

function CustomerLogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        const token = localStorage.getItem("customerToken")
        if (token) {
            navigate("/")
        }
    }, [])

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({
            ...userData,
            [name]: value,
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...userData
            })
        })
        const responseData = await response.json();
        if (response.ok) {
            localStorage.setItem("customerToken", responseData.token)
            toast.success('Logged in successfully');
            setUserData({
                email: "",
                password: ""
            })
            navigate('/');
        } else {
            toast.error(responseData.message);
        }
        setLoading(false)
    };

    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <div className='h-screen w-full flex flex-1 justify-center items-center'>
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-2xl font-bold mb-4 text-center">Customer Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
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
                            </div> : "Login"}
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        Don’t have an account?{' '}
                        <button
                            onClick={() => navigate('/register')}
                            className="text-yellow-500 underline font-semibold hover:text-yellow-600"
                        >
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CustomerLogin