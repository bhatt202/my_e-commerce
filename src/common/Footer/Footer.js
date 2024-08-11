import React from "react";
import { Container } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "../Footer/Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="footer-main mt-5">
          <div className="inner-cart">
            <div className="logo">
              <img src={logo} alt="" width={"100px"} />
            </div>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation laboris nisi ut
              aliquip ex ea commodo consequat.Ut enim ad minim veniam,quis
              nostrud exercitation
            </p>
            <div className="social">
              <h4>KEEP IN TOUCH</h4>
              <div className="social-link">
                <a href="">
                  <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="">
                  <i class="fa-brands fa-square-twitter"></i>
                </a>
                <a href="">
                  <i class="fa-brands fa-square-instagram"></i>
                </a>
                <a href="">
                  <i class="fa-brands fa-square-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="inner-cart">
            <h3 style={{ textAlign: "center" }}>INFORMATION</h3>
            <div className="list">
              <li>Letest News</li>
              <li>Career</li>
              <li>My Account</li>
              <NavLink to={"/Cart"}>
                <li>My Cart</li>
              </NavLink>
              <li>Orders and Returns</li>
            </div>
          </div>

          <div className="inner-cart">
            <h3 style={{ textAlign: "center" }}>CUSTOMER SERVICE</h3>
            <div className="list">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Shipping & Returns</li>
              <NavLink to={"/Cart"}>
                <li>Help & FAQs</li>
              </NavLink>
              <li>Refund Policy</li>
              <li>Customer Service</li>
            </div>
          </div>

          <div className="inner-cart">
            <h3 style={{ textAlign: "center" }}>NEWSLETTER</h3>
            <p>
              Enter your email to receive daily news and get 20% off coupon for
              all items. NO spam, we promise
            </p>
            <div className="input-text">
              <input type="text" placeholder="Email Address"/>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
