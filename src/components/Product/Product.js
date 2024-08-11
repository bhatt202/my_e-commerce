import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../Product/product.css";
import Card from "../../common/Card";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [mensProduct, setMensProduct] = useState([]);
  const [kidsProduct, setKidsProduct] = useState([]);

  const navigate = useNavigate();

  const getProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((res) => {
        // console.log(res.data)
        const filterSaree = res.data.filter(
          (item) => item.category === "Saree"
        );
        setProduct(filterSaree);
        const mensData = res.data.filter(
          (item) => item.category === "Men's Shirt"
        );
        setMensProduct(mensData);
        const kidsData = res.data.filter(
          (item) => item.category === "Kid's wear"
        );
        setKidsProduct(kidsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(kidsProduct);
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Container>
        <div className="title-product">
          <h2>|----------Saree Collection----------|</h2>
        </div>
        <Row className="mt-5">
          {product.slice(0, 8).map((item) => {
            return <Card item={item}/>;
          })}
          <button
            className="btn btn-primary"
            style={{ textAlign: "center", width: "20%", margin: "0px auto" }}
            onClick={()=>navigate('/SareeProduct')}
          >
            View More
          </button>
        </Row>
      </Container>
      {/* // men's product data----------------------------- */}
      <Container>
        <div className="title-product">
          <h2>|----------Men's Collection----------|</h2>
        </div>
        <Row className="mt-5">
          {mensProduct.slice(0, 8).map((item) => {
            return <Card item={item} />;
          })}
          <button
            className="btn btn-primary"
            style={{ textAlign: "center", width: "20%", margin: "0px auto" }}
            onClick={()=>navigate('/MensProduct')}
          >
            View More
          </button>
        </Row>
      </Container>

      {/*  Kids Product Data----------------------*/}
      <Container>
        <div className="title-product">
          <h2>|----------Kid's Collection----------|</h2>
        </div>
        <Row className="mt-5">
          {kidsProduct.slice(0, 8).map((item) => {
            return <Card item={item} />;
          })}
          <button
            className="btn btn-primary"
            style={{ textAlign: "center", width: "20%", margin: "0px auto" }}
            onClick={()=>navigate('/kidsProduct')}
          >
            View More
          </button>
        </Row>
      </Container>
    </>
  );
};

export default Product;
