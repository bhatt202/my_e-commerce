import React, { useEffect, useState } from "react";
import Header from "../../common/Header/Header";
import Collection_Topbar from "../../common/Collection-TopBar/Collection_Topbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import ImageSection from "./ImageSection";
import "../Product/SingleProduct.css";
import ReletedProduct from "./ReletedProduct";
import { toast } from "react-toastify";
import Footer from "../../common/Footer/Footer";
// import { uuid } from 'uuidv4';

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  let loginUser = localStorage.getItem("user_login_record") || false;

  if (loginUser) {
    loginUser = JSON.parse(loginUser);
  } else {
    loginUser = false;
  }

  // console.log("single product id", id);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${id}`)
      .then((res) => {
        console.log("single product data res.data", res.data);
        setSingleProduct(res.data);
      });
  }, [id]);

  const handleAddtoCart = async () => {
    let data = {
      productId: id,
      userId: loginUser?._id,
      quantity: amount,
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/add-to-cart`, data)
      .then((res) => {
        console.log(JSON.stringify(res.data));

        if (res?.data?.success) {
          navigate("/Cart", { state: { data } });
        } else {
          toast(res?.data?.message, { type: "warn", theme: "dark" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const decrement = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };
  const increment = () => {
    amount < singleProduct.stock
      ? setAmount(amount + 1)
      : setAmount(singleProduct.stock);
  };
  console.log("single record ", singleProduct);
  return (
    <>
      <Header />
      <Collection_Topbar />
      {singleProduct && (
        <Container>
          <Row className="mt-5 product-container">
            <Col lg={6} md={12} className="product-images">
              <ImageSection images={singleProduct?.image || []} />
            </Col>
            <Col lg={6} md={12} className="mt-5 product-description">
              <div className="product-descripation">
                <h4
                  className="product-title"
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  <span>Title:-</span>
                  {singleProduct?.name}
                </h4>
                <p className="product-description-text">
                  <span>Description:</span>
                  {singleProduct?.description}
                </p>
                <h4 className="product-price">
                  <span>Price:-</span>
                  {singleProduct?.price}
                </h4>
                <h4 className="product-category">
                  <span>Category:-</span>
                  {singleProduct?.category}
                </h4>
                <div className="cart-toggle">
                  <button
                    onClick={() => decrement()}
                    disabled={amount === 1}
                    className="quantity-button"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <div className="cart-quantity">{amount}</div>
                  <button
                    onClick={() => increment()}
                    disabled={amount === singleProduct.stock}
                    className={`quantity-button ${
                      amount < singleProduct.stock ? "active" : ""
                    }`}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <button
                  className="add-to-cart-button"
                  onClick={() => {
                    if (!loginUser) {
                      localStorage.setItem(
                        "productPath",
                        window.location.pathname
                      );
                      navigate("/login");
                    } else {
                      handleAddtoCart();
                    }
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <ReletedProduct category={singleProduct.category} />
      {/* <Footer/> */}
    </>
  );
};

export default SingleProduct;
