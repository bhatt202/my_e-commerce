import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Card from "../../common/Card";
import Header from "../../common/Header/Header";
import Collection_Topbar from "../../common/Collection-TopBar/Collection_Topbar";

const MensCollection = () => {
  const [menData, setMenData] = useState([]);
  const getData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`).then((res) => {
      const mensData = res.data.filter(
        (item) => item.category === "Men's Shirt"
      );
      console.log(mensData);
      setMenData(mensData);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header/>
      <Collection_Topbar />
      <Container>
        <div className="title-product">
          <h2>|----------Men's Collection----------|</h2>
        </div>
        <Row className="mt-5">
          {menData.map((item) => {
            return <Card item={item} />;
          })}
        </Row>
      </Container>
    </>
  );
};

export default MensCollection;
