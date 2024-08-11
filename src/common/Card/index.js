import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const UserIdGet = JSON.parse(localStorage.getItem("user_login_record"));
  const UserId = UserIdGet?._id;

  const [addedToWishlist, setAddedToWishlist] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const SingleProduct = (id) => {
    navigate(`/SingleProduct/${id}`);
    scrollToTop();
  };

  // const addToWishlist = () => {
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API_URL}/add/wishlist/${UserId}/${item._id}`
  //     )
  //     .then((res) => {
  //       setAddedToWishlist(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const addToWishlist = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/add/wishlist/${UserId}/${item._id}`
      )
      .then((res) => {
        console.log('res post wishlist data',res.data)
        // Update local storage with new wishlist data after adding to wishlist
        const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || [];
        localStorage.setItem(
          "wishlistData",
          JSON.stringify([...wishlistData, item])
        );
        setAddedToWishlist(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || [];
    const isAdded = wishlistData.some(product => product._id === item._id);
    setAddedToWishlist(isAdded);
  }, [item._id]);
  return (
    <Col lg={3} md={12} style={{ paddingBottom: "50px" }}>
      <div className="mainclass-product">
        <div className="product-image">
          <img src={item.image[0]} style={{ width: "100%" }} alt="" />
          <div className="inner-card">
            <div className="shop">
              <Button>
                <div className="icons">
                  <a href="">
                    <i class="fa-solid fa-eye"></i>
                  </a>
                </div>
                <div className="view">Quick View</div>
              </Button>
              <Button onClick={() => SingleProduct(item._id)}>
                <div className="icons">
                  <i class="fa fa-shopping-cart"></i>
                  <div className="view">Add To Cart</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <p>Title:- {item.name}</p>
          <p>Price:- {item.price}</p>
          <div
            className="wishlist"
            style={{
              position: "absolute",
              bottom: "0px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            {addedToWishlist ? (
              <i
                style={{ fontSize: "24px", color: "#f953c6" }}
                className="fa-solid fa-heart"
              ></i>
            ) : (
              <i
                style={{ fontSize: "24px" }}
                className="fa-regular fa-heart"
                onClick={addToWishlist} 
              ></i>
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default Card;
