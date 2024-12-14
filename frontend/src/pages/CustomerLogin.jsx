import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

function CustomerLogin() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        const token = localStorage.getItem("customerToken")
        if (token) {
            navigate("/customer")
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
            navigate('/customer');
        } else {
            toast.error(responseData.message);
        }
    };

    return (
        <div className='h-screen w-full flex justify-center items-center'>
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
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInput}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don’t have an account?{' '}
                    <button
                        onClick={() => navigate('/customer-register')}
                        className="text-green-500 underline hover:text-green-600"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    )
}

export default CustomerLogin