import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CustomerRegister() {
    const navigate = useNavigate();

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
            navigate('/customer-login');
        } else {
            toast.error('Something went wrong');
        }
    };

    return (
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
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInput}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
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
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/customer-login')}
                        className="text-green-500 underline hover:text-green-600"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
export default CustomerRegister;