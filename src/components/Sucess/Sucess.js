import React, { useCallback, useEffect, useState } from "react";
import "../Sucess/sucess.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sucess = () => {
  const UserIdGet = JSON.parse(localStorage.getItem("user_login_record"));
  const UserId = UserIdGet?._id;
  const [downloadLink, setDownloadLink] = useState("");

  const navigate=useNavigate()
  

  const handleDownload = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/generate-invoice/${UserId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${UserId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading invoice:', error);
    }
  };
useEffect(()=>{
  setTimeout(() => {
    try {
       axios.delete(`${process.env.REACT_APP_API_URL}/api/remove-all-from-cart/${UserId}`);
      console.log("Cart data cleared upon successful payment");
      navigate('/')
    } catch (error) {
      // Handle error
    }
  }, 2000);
},[])
  return (
    <>
      <div class="success-page">
        <div class="payment-success ">
          <i class="fas fa-check-circle animated bounceIn"></i>
          <h2 className=" infinite pulse">Payment Successful!</h2>
          <p className="">Your payment has been processed successfully.</p>
        </div>
      </div>
      <div>
        <button onClick={handleDownload}>Invoice Download</button>
        {downloadLink && (
          <a
            href={downloadLink}
            download={`invoice_${UserId}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to download
          </a>
        )}
      </div>
    </>
  );
};

export default Sucess;
