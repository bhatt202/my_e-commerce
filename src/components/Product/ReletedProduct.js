import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Card from "../../common/Card";

const ReletedProduct = ({ category }) => {
  const { id } = useParams();
  const [reletedData, setReletedData] = useState([]);

  const ReletedProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((res) => {
        const finalData = res.data.filter(
          (item) => item._id != id && item.category == category
        );
        setReletedData(finalData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    ReletedProduct();
  }, [id, category]);
  return (
    <Container>
      <div className="title-product">
        <h2>|----------Releted Product----------|</h2>
      </div>
      <Row className="mt-5">
        {reletedData.slice(0, 8).map((item) => {
          return <Card item={item} />;
        })}
        {/* <button
            className="btn btn-primary"
            onClick={()=>navigator('/')}
            style={{ textAlign: "center", width: "20%", margin: "0px auto" }}
          >
            View More
          </button> */}
      </Row>
    </Container>
  );
};

export default ReletedProduct;
