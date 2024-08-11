import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import "../Product/cart.css";
import Header from "../../common/Header/Header";
import Collection_Topbar from "../../common/Collection-TopBar/Collection_Topbar";
import Footer from "../../common/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCartUponPaymentSuccess } from './cartUtils';

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  // const [amount, setAmount] = useState();
  const UserIdGet = JSON.parse(localStorage.getItem("user_login_record"));
  const UserId = UserIdGet?._id;


  // const handlePaymentSuccess = async () => {
  //   try {
  //     await clearCartUponPaymentSuccess(UserId); // Assuming this function clears cart data
  //     setCartData([]); // Optionally clear cartData state or set to empty array
  //   } catch (error) {
  //     console.error("Error handling payment success:", error);
  //   }
  // };
  // useEffect(() => {
  //   handlePaymentSuccess(); // You can trigger this upon a specific event or condition
  // }, [])

  const navigate = useNavigate();
  
  const redirectToCheckout = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/checkout", { state: JSON.stringify(cartData) });
    }, 2000);
  };

  const handleQuantityUpdate = async (itemId, quantity) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/update-cart-item-quantity/${UserId}/${itemId}`,
        {
          quantity: quantity,
        }
      );
      // Optionally, handle success actions or refresh cart data
      getCartData(); // Refresh cart data after updating quantity
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const getCartData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-cart/${UserId}`)
      .then((res) => {
        console.log("res.data cart get data", res.data.cart.items);
        setCartData(res.data.cart.items);
      });
  };

  let cartlength = localStorage.setItem(
    "cartLength",
    JSON.stringify(cartData.length)
  );

  const DeleteProduct = async (id, index) => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/remove-from-cart/${UserId}/${id}`
      )
      .then((res) => {
        if (res.data.success) {
          let tempData = cartData;
          tempData.splice(index, 1);
          setCartData([...tempData]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // sub total ------------

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of cartData) {
      subtotal += item.product.price * item.quantity;
    }
    return subtotal;
  };

  const decrement = (index) => {
    const updatedCartData = [...cartData];
    if (updatedCartData[index]?.quantity > 1) {
      updatedCartData[index].quantity -= 1;
      setCartData(updatedCartData);
      handleQuantityUpdate(
        updatedCartData[index]._id,
        updatedCartData[index].quantity
      );
    }
  };

  const increment = (index, availableStock) => {
    const updatedCartData = [...cartData];
    if (updatedCartData[index].quantity < availableStock) {
      updatedCartData[index].quantity += 1;
      setCartData(updatedCartData);
      handleQuantityUpdate(
        updatedCartData[index]._id,
        updatedCartData[index].quantity
      );
    } else {
      console.log("Cannot increment further, stock limit reached");
    }
  };

  useEffect(() => {
    if (UserId) {
      getCartData();
    }
  }, [UserId]);
  return (
    <>
      <Header />
      <Collection_Topbar />
      <Container>
        <div className="main-cart table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>sr</th>
                <th>product</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartData?.length > 0 &&
                cartData?.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={item?.product?.image[0]}
                          alt=""
                          width={"100px"}
                        />
                      </td>
                      <td>{item?.product?.name}</td>
                      <td>{item?.product?.price}</td>
                      <td>
                        <div className="toggle-product">
                          <button
                            onClick={() => decrement(index)}
                            disabled={cartData[index]?.quantity === 1}
                            className="quantity-button"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>

                          <div className="cart-quantity">{item?.quantity}</div>
                          
                          <button
                            onClick={() => increment(index, item.product.stock)}
                            disabled={
                              cartData[index]?.quantity === item.product.stock
                            }
                            className={`quantity-button ${
                              cartData[index]?.quantity < item.product.stock
                                ? "active"
                                : ""
                            }`}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td>{item?.product?.price * item?.quantity}</td>
                      <td className="delete">
                        <i
                          onClick={() => DeleteProduct(item?._id, index)}
                          class="fa-solid fa-trash"
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Container>
      <Container>
        <div className="calculation">
          <p>SubTotal:-{calculateSubtotal()}</p>
        </div>
        <button className="btn btn-primary" onClick={redirectToCheckout}>
          Check Out
        </button>
        {isLoading && (
          <div className="loading-overlay">
            <div className="loader"></div>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
