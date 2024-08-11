    import axios from 'axios';
    import React from 'react'
    import { useEffect } from 'react';
    import { useState } from 'react';

    const Profile = () => {
        const [userData, setUserData] = useState({});
        const [userOrders, setUserOrders] = useState([]);

        const UserIdGet = JSON.parse(localStorage.getItem("user_login_record"));
        const UserId = UserIdGet?._id;
    
        useEffect(() => {
        //   const userId = "123"; // Replace with your actual user ID or get it dynamically
    
        const fetchUserData = async () => {
            try {
            const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user/${UserId}`);
            setUserData(userResponse.data);
    
            const ordersResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/lasttwodays/${UserId}`);
            setUserOrders(ordersResponse.data);
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };
    
        fetchUserData();
        }, []);
    console.log('userOrders-------',userOrders)
    return (
        <div className="profile-container">
        <div className="profile-details">
            <h2>User Profile</h2>
            <div>
            <p>Name: {userData?.user?.firstName}</p>
            <p>Email: {userData?.user?.email}</p>
            </div>
        </div>

        <div className="order-history">
            <h2>Order History</h2>
            <ul>
            {userOrders.map((order) => (
                <li key={order.id}>
                <p>Order ID: {order.id}</p>
                <p>Total: {order.total}</p>
                </li>
            ))}
            </ul>
        </div>
        </div>
    )
    }

    export default Profile
