import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("customerToken");
        navigate("/")
    }, [])
    return null
}

export default Logout