import React, { useContext } from 'react'
import { ShopContext } from "../context/ShopContext.jsx";

const Cart = () => {

  const { product, currency, cartItems } = useContext(ShopContext);
  
  


  return (
    <div>Cart</div>
  )
}

export default Cart