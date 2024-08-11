import React, { useEffect, useState } from "react";
import Collection_Topbar from "../../common/Collection-TopBar/Collection_Topbar";
import Header from '../../common/Header/Header'
import axios from "axios";
import Card from "../../common/Card";
import { Container, Row } from "react-bootstrap";
import Footer from "../../common/Footer/Footer";

const SareeCollection = () => {
  const[saree,setSaree]=useState([])
  const getData=()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`).then((res)=>{
      const sareedata=res.data.filter((item)=>item.category==="Saree")
      setSaree(sareedata);
    })
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <>
      <Header/>
      <Collection_Topbar />
      <Container>
        <Row className="mt-5">
          {saree.map((item) => {
            return <Card item={item} />;
          })}
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default SareeCollection;
