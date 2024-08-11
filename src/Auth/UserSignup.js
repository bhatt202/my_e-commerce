import React, { useState } from "react";
import "../Auth/UserSignup.css";
import { Button, FloatingLabel, Form, FormGroup } from "react-bootstrap";
import Header from "../common/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserSignup = () => {
  const [userSignup, setUserSignup] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  };

  const navigate = useNavigate();

  const submitData = async (e) => {
    e.preventDefault();

    const error = {};

    if (!userSignup.firstName) {
      error.firstName = "Please Enter Your First Name";
    }
    if (!userSignup.lastName) {
      error.lastName = "Please Enter Your Last Name";
    }
    if (!userSignup.email) {
      error.email = "Please Enter Your Email id";
    } else if (!validateEmail(userSignup.email)) {
      error.email = "Please Enter a Valid email address";
    }
    if (!userSignup.mobile) {
      error.mobile = "Please Enter Your Mobile Number";
    }
    if (!userSignup.password) {
      error.password = "Please Enter Your password";
    }
    setValidationErrors(error);
    if (Object.keys(error).length === 0) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, userSignup)
        .then((res) => {
          console.log("res", res);
          toast("Registration successfully!", {
            type: "success",
            theme: "dark",
          });
          navigate("/Login");
        })
        .catch((error) => {
          console.log(error);
          toast("Somthing worng!", { type: "error", theme: "dark" });
        });
    }
  };
  return (
    <>
      <Header />
      <div className="signup-bg">
        <div className="formsignup">
          <h3>Registration</h3>
          <Form onSubmit={submitData}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="First Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Your First Name"
                  name="firstName"
                  value={userSignup.firstName}
                  onChange={(e) =>
                    setUserSignup({ ...userSignup, firstName: e.target.value })
                  }
                />
                {validationErrors.firstName && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {validationErrors.firstName}
                  </div>
                )}
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="Last Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Your Last Name"
                  name="lastName"
                  value={userSignup.lastName}
                  onChange={(e) =>
                    setUserSignup({ ...userSignup, lastName: e.target.value })
                  }
                />
                {validationErrors.lastName && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {validationErrors.lastName}
                  </div>
                )}
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Enter Your Email Id"
                  name="email"
                  value={userSignup.email}
                  onChange={(e) =>
                    setUserSignup({ ...userSignup, email: e.target.value })
                  }
                />
                {validationErrors.email && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {validationErrors.email}
                  </div>
                )}
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="Contact Number"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="Enter Your Contact Number"
                  name="mobile"
                  value={userSignup.mobile}
                  onChange={(e) =>
                    setUserSignup({ ...userSignup, mobile: e.target.value })
                  }
                />
                {validationErrors.mobile && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {validationErrors.mobile}
                  </div>
                )}
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Enter Your password"
                  name="password"
                  value={userSignup.password}
                  onChange={(e) =>
                    setUserSignup({ ...userSignup, password: e.target.value })
                  }
                />
                {validationErrors.password && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {validationErrors.password}
                  </div>
                )}
              </FloatingLabel>
            </Form.Group>
            <div className="submit">
              <Button variant="info" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
