import React, { useState, useEffect } from "react";
import { Container, Dropdown, Nav, NavLink, Navbar } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "../Header/Header.css";
import { useDarkMode } from "../../Conntext";

const Header = () => {
  const [bgColor, setBgColor] = useState("rgb(73,73,73)");
  const [textColor, setTextColor] = useState("#fff");
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const cartlength = JSON.parse(localStorage.getItem("cartLength"));

  const wishlistLength = JSON.parse(localStorage.getItem("wishlist"));

  let loginUser = localStorage.getItem("user_login_record") || false;

  if (loginUser) {
    loginUser = JSON.parse(loginUser);
  } else {
    loginUser = false;
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0, { behavior: "smooth" });
    }, 10);

    document.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setBgColor("#fff");
        setTextColor("#242625");
      } else {
        setBgColor("rgb(73,73,73)");
        setTextColor("#fff");
      }
    });
  }, []);
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#222222" : "#FFFFFF";
    document.body.style.color = isDarkMode ? "#FFFFFF" : "#222222";
  }, [isDarkMode]);

  const toggleModeOnClick = () => {
    toggleDarkMode();
  };
  return (
    <div className="hearder-block">
      <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        style={{ backgroundColor: bgColor }}
      >
        <Container>
          {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
          <Nav.Link href="/">
            <img src={logo} width={"100px"} height={"50px"} alt="" />
          </Nav.Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/SareeProduct" style={{ color: textColor }}>
                Saree
              </Nav.Link>
              <Nav.Link href="/MensProduct" style={{ color: textColor }}>
                Men's Collection
              </Nav.Link>
              <Nav.Link href="/kidsProduct" style={{ color: textColor }}>
                Kids's Collection
              </Nav.Link>
            </Nav>

            <Nav>
              <NavLink onClick={toggleModeOnClick}>
                <i
                  className={`fa-solid ${isDarkMode ? "fa-sun" : "fa-moon"}`}
                  onClick={toggleModeOnClick}
                  style={{ color: textColor }}
                ></i>
              </NavLink>
              <NavLink
                href="/Cart"
                className="cart"
                style={{ color: textColor }}
              >
                <i class="fa-solid fa-cart-shopping">
                  <span>{cartlength}</span>
                </i>
              </NavLink>
              &nbsp;&nbsp;&nbsp;
              <NavLink
                href="/wishlist"
                className="cart"
                style={{ color: textColor }}
              >
                <i class="fa-regular fa-heart">
                  <span>{wishlistLength}</span>
                </i>
              </NavLink>
              &nbsp;&nbsp;&nbsp;
              <Dropdown>
                <Dropdown.Toggle
                  variant=""
                  id="dropdown-basic"
                  style={{ color: textColor }}
                >
                  <i class="fa-solid fa-user"></i>&nbsp;&nbsp;
                  {loginUser?.firstName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {loginUser && loginUser._id ? (
                    <Dropdown.Item
                      onClick={() => {
                        localStorage.setItem("user_login_record", null);
                        window.location.reload();
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item href="/Login">Login</Dropdown.Item>
                  )}
                  {loginUser && loginUser._id ? (
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  ) : (
                    <Dropdown.Item href="/signup">Registation</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
