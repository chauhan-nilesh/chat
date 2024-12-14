import React, { useEffect, useState } from 'react';
import Loader from '../../../frontend/src/components/Loader';

function SubdomainExist({ children }) {
    const [loading, setLoading] = useState(true)
    const [userExist, setUserExist] = useState(false)

    const subdomain = window.location.hostname.split(".")[0];

    useEffect(() => {
        try {
            setLoading(true)
                ; (async () => {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/subdomain`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            subdomain
                        })
                    })
                    if(response.ok){
                        const responseData = await response.json();
                        setUserExist(responseData.status)
                    }
                })()

            setLoading(false)
        } catch (error) {
            console.log("Error", error)
            setLoading(false)
        }
    }, [])

    if (loading) {
        return <Loader />
    }

    return userExist && loading === false ? children : <Loader />

}

export default SubdomainExist