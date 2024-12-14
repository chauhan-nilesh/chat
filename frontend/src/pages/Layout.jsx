import React from 'react'
import Header from '../components/Home/Header'
import { Outlet } from 'react-router'
import Footer from '../components/Home/Footer'

function Layout() {
    return (
        <div data-theme="light" className='h-screen flex flex-col'>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout