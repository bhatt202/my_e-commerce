import axios from "axios";
import React, { useEffect, useState } from "react";
import Collection_Topbar from "../../common/Collection-TopBar/Collection_Topbar";
import Header from "../../common/Header/Header";
import { Container, Row } from "react-bootstrap";
import Card from "../../common/Card";

const KidsCollection = () => {
  const [kidsProduct, setKidsProduct] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`).then((res) => {
      const kidsData = res.data.filter(
        (item) => item.category === "Kid's wear"
      );
      setKidsProduct(kidsData);
    });
  }, []);
  return (
    <>
      <Header />
      <Collection_Topbar />
      <Container>
        <div className="title-product">
          <h2>|----------Kids's Collection----------|</h2>
        </div>
        <Row className="mt-5">
          {kidsProduct.map((item) => {
            return <Card item={item} />;
          })}
        </Row>
      </Container>
    </>
  );
};

export default KidsCollection;
