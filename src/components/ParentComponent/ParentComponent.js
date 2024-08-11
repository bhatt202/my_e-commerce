import React, { useState, useEffect } from "react";
import axios from "axios";
import Cart from "../Product/Cart";
import CheckOut from "../Checkout/checkout";

const ParentComponent = () => {
  const [cartData, setCartData] = useState([]);

  const fetchCartData = async () => {
    const UserIdGet = JSON.parse(localStorage.getItem("user_login_record"));
    const UserId = UserIdGet ? UserIdGet._id : null;

    if (UserId) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/get-cart/${UserId}`
        );
        setCartData(response.data.cart.items);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const updateCartData = async (updatedCartData) => {
    const UserIdGet = JSON.parse(localStorage.getItem("user_login_record"));
    const UserId = UserIdGet ? UserIdGet._id : null;

    if (UserId) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/update-cart-item-quantity/${UserId}`,
          {
            cartItems: updatedCartData,
          }
        );
        setCartData(updatedCartData);
      } catch (error) {
        console.error("Error updating cart data:", error);
      }
    }
  };

  return (
    <>
      <Cart cartData={cartData} setCartData={setCartData} />
      <CheckOut cartDatas={cartData} updateCartData={updateCartData} />
    </>
  );
};

export default ParentComponent;
