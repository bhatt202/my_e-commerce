import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../../components/Product/image.css";
import ReactImageMagnify from "react-image-magnify";
const ImageSection = ({ images }) => {
  const [imgChange, setImgChange] = useState(null);

  useEffect(() => {
    setImgChange(images?.[0]);
  }, [images]);

  return (
    <Row>
      <div className="all-image">
        <Col lg={6} md={12}>
          <div className="main-image">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src:imgChange
                },
                largeImage: {
                  src: imgChange,
                  width: 1200,
                  height: 1800,
                },
                enlargedImagePosition:'over'
              }}
            />
            {/* <img src={imgChange} alt="" width={"100%"} /> */}
          </div>
        </Col>
        <Col lg={6}>
          <div className="inner-image">
            {images?.map((item) => {
              return (
                <div className="slider-image">
                  <img src={item} alt="" onClick={() => setImgChange(item)} />
                </div>
              );
            })}
          </div>
        </Col>
      </div>
    </Row>
  );
};

export default ImageSection;
