import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Loader from "../../../frontend/src/components/Loader";
import { Helmet } from "react-helmet";

const Header = () => {
  const [loading, setLoading] = useState(true)
  const [userExist, setUserExist] = useState({})

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
          if (response.ok) {
            const responseData = await response.json();
            setUserExist(responseData.data)
          }
        })()

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Helmet>
        <title>{userExist.name}</title>
        <meta name="description" content={userExist.name} />
      </Helmet>
      <header className="bg-white shadow-md px-2 lg:px-28 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" ><h1 className="text-2xl font-bold text-gray-800">{userExist.name}</h1></Link>

          {/* <nav className="hidden md:flex space-x-6">
          <Link to={""} className="hover:text-yellow-500">
            Product
          </Link>
          <Link to={""} className="hover:text-yellow-500">
            Resources
          </Link>
          <Link to={""} className="hover:text-yellow-500">
            Pricing
          </Link>
          <Link to={""} className="hover:text-yellow-500">
            Integrations
          </Link>
        </nav> */}

          <div>
            <Link to={"/login"}
              className="text-gray-800 px-4 py-2 text-sm lg:text-base font-semibold hover:text-yellow-500"
            >
              Login
            </Link>
            <Link to={"/register"}
              className="bg-yellow-500 text-slate-950 text-sm lg:text-base font-semibold px-4 py-2 rounded hover:bg-yellow-600"
            >
              Register
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
