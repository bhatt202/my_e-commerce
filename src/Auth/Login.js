import React, { useState } from "react";
import "../Auth/Login.css";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header/Header";
import { toast } from "react-toastify";

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loginData = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/signin`, loginUser)
      .then((res) => {
        // console.log("login succsesfully", res);
        setTimeout(() => {
          localStorage.setItem(
            "user_login_record",
            JSON.stringify(res.data.user)
          );
          const navigatePath = localStorage.getItem("productPath") || false;

          if (navigatePath && ![null, "null", ""].includes(navigatePath)) {
            localStorage.setItem("productPath", null);
            navigate(navigatePath, { replace: true });
            toast("Login successfully!", { type: "success", theme: "dark" });
          } else {
            toast("Login successfully!", { type: "success", theme: "dark" });
            navigate("/", { replace: true });
          }
          setIsLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        toast("Invalid User!", { type: "error", theme: "dark" });
      });
  };
  return (
    <>
      <Header />
      <div className="login-bg">
        <div className="loginform">
          <h2>Login</h2>
          <Form onSubmit={loginData}>
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
                  value={loginUser.email}
                  onChange={(e) =>
                    setLoginUser({ ...loginUser, email: e.target.value })
                  }
                />
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
                  value={loginUser.password}
                  onChange={(e) =>
                    setLoginUser({ ...loginUser, password: e.target.value })
                  }
                />
              </FloatingLabel>
            </Form.Group>
            <div className="login">
              <Button variant="info" type="submit" disabled={isLoading}>
                {/* Show Spinner when loading, or 'Login' text when not */}
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
