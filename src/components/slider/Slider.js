import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import b1 from "../../assets/banner1.webp";
import b2 from "../../assets/banner2.webp";
import b3 from "../../assets/banner3.jpg";

const Slider = () => {
  return (
    <>
      <Carousel
        className="pt-5"
        showThumbs={false}
        transitionTime={1000}
        autoPlay={true}
        infiniteLoop={true}
      >
        <div>
          <img src={b1} />
        </div>
        <div>
          <img src={b3} />
        </div>
        <div>
          <img src={b3} />
        </div>
      </Carousel>
    </>
  );
};

export default Slider;
