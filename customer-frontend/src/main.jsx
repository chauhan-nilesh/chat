import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App';
import CustomerRegister from './pages/CustomerRegister';
import CustomerLogin from './pages/CustomerLogin';
import Logout from './pages/Logout';
import SubdomainExist from './PrivateRoute/SubdomainExist';
import Error from './pages/Error';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={
        <SubdomainExist>
          <App />
        </SubdomainExist>
      } />
        <Route path="register" element={<CustomerRegister />} />
        <Route path="login" element={<CustomerLogin />} />
        <Route path='logout' element={<Logout />} />
        <Route path='*' element={<Error />} />
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
