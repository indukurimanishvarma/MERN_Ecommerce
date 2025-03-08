import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import Register from './Register/Register'
import Login from './Login/Login'
import Cart from './Cart/Cart'
import Checkout from './Checkout/Checkout'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
const stripePromide=loadStripe("pk_test_51NpUd8SG3fKQH8BjH5ZlGfG7G1uH0bGZMn8D4pXNv6P4qWtQH1pKxZ4GZk4oKb6zI6WmMlSfWt2X8jxTn5X4i00t2Pq4m0D")
import { AuthProvider } from './context/AuthContext'
import Navigation from './Navigation/Navigation'
import AddProduct from './AddProduct/AddProduct'
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Navigation/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-product" element={<AddProduct/>}/>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={
              <Elements stripe={stripePromide}>
                <Checkout />
              </Elements>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}