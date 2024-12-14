import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import './index.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { Toaster } from 'react-hot-toast';
import Logout from './pages/Logout.jsx';
import CustomerRegister from './pages/CustomerRegister.jsx';
import CustomerLogin from './pages/CustomerLogin.jsx';
import Home from './pages/Home.jsx';
import Layout from './pages/Layout.jsx';
import App from './App.jsx';
import CustomerChat from './pages/CustomerChat.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={
          <Layout />
      } >
        <Route path='' element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>
      <Route path="/chat" element={<App />} />
      <Route path="/customer" element={<CustomerChat />} />
      <Route path="customer-register" element={<CustomerRegister />} />
      <Route path="customer-login" element={<CustomerLogin />} />
      <Route path='/logout' element={<Logout />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)
