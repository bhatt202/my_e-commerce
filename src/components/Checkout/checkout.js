import React, { useEffect, useState } from "react";
import {Button,Card,Col,Container,FloatingLabel,Form,Row,Modal,Table,} from "react-bootstrap";
import Header from "../../common/Header/Header";
import Collection_Topbar from "../../common/Collection-TopBar/Collection_Topbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../Checkout/checkout.css";
import { toast } from "react-toastify";
import useHistory from "react-router-dom";

const CheckOut = ({ cartDatas, updateCartData }) => {
  const navigate = useNavigate();
  // const history = useHistory();
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phoneNumber: "",
  });
  const location = useLocation();
  // const orderProductData = JSON.parse(location?.state);

  // console.log('orderProductData?????????????????????????????',orderProductData);

  const [submittedAddresses, setSubmittedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const loginId = JSON.parse(localStorage.getItem("user_login_record"));
  const finalUserId = loginId._id;

  const [orderProduct, setOrderProduct] = useState([]);
  const cartData = JSON.parse(location.state || []);
  const [selectAddressId, setSelectAddressId] = useState(null);

  useEffect(() => {
    setOrderProduct(cartData);
  }, [finalUserId]);

  const handleQuantityUpdate = async (itemId, quantity) => {
    // const UserIdGet = JSON.parse(localStorage.getItem("user_login_record"));
    // const UserId = UserIdGet ? UserIdGet._id : null;

    if (finalUserId) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/update-cart-item-quantity/${finalUserId}`,
          {
            itemId,
            quantity,
          }
        );

        const updatedCartData = cartData.map((item) => {
          if (item._id === itemId) {
            return { ...item, quantity };
          }
          return item;
        });

        updateCartData(updatedCartData);
      } catch (error) {
        console.error("Error updating item quantity:", error);
      }
    }
  };

  const decrement = (index) => {
    const updatedOrderProduct = [...orderProduct];
    if (updatedOrderProduct[index]?.quantity > 1) {
      updatedOrderProduct[index].quantity -= 1;
      setOrderProduct(updatedOrderProduct);
      handleQuantityUpdate(
        updatedOrderProduct[index]._id,
        updatedOrderProduct[index].quantity
      );
    }
  };
  const increment = (index, availableStock) => {
    const updatedOrderProduct = [...orderProduct];
    if (updatedOrderProduct[index].quantity < availableStock) {
      updatedOrderProduct[index].quantity += 1;
      setOrderProduct(updatedOrderProduct);
      handleQuantityUpdate(
        updatedOrderProduct[index]._id,
        updatedOrderProduct[index].quantity
      );
    } else {
      console.log("Cannot increment further, stock limit reached");
    }
  };

  const DeleteProduct = async (id, index) => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/remove-from-cart/${finalUserId}/${id}`
      )
      .then((res) => {
        if (res.data.success) {
          let tempData = orderProduct;
          tempData.splice(index, 1);
          setOrderProduct([...tempData]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitData = (e) => {
    // console.log("click submit data");
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/users/${finalUserId}/addresses`,
        addressData
      )
      .then((res) => {
        console.log(res.data);
        fetchSubmittedAddresses();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSubmittedAddresses = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/users/${finalUserId}/addresses`
      )
      .then((res) => {
        setSubmittedAddresses(res.data); // Assuming the response contains an array of addresses
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("submittedAddresses", submittedAddresses);
  useEffect(() => {
    fetchSubmittedAddresses();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = (address) => {
    setSelectedAddress(address); // Set selected address data
  };
  // update address ---------------
  const updateAddress = () => {
    if (!selectedAddress) {
      console.error("No address selected for update");
      return;
    }

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/users/${finalUserId}/addresses/${selectedAddress._id}`,
        selectedAddress
      )
      .then((res) => {
        console.log("Address updated successfully:", res.data);
        // You can perform additional actions after successful update if needed
        // For example, refetch updated addresses
        fetchSubmittedAddresses();
        handleClose();
        toast("Address Update successfully!", {
          type: "success",
          theme: "dark",
        });
      })
      .catch((error) => {
        console.error("Error updating address:", error);
      });
  };

  const handleSelectAddress = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/${finalUserId}/select/${selectAddressId}`
      )
      .then((res) => {
        console.log("Address selected:", res.data);
        // Redirect to the payment page after selecting an address
        navigate("/payment");
      })
      .catch((error) => {
        console.error("Error selecting address:", error);
      });
  };
  // const handleUpdate = (updatedAddress, index) => {
  //   updateAddress(updatedAddress, index);
  // };
  const state = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <>
      <Header />
      <Collection_Topbar />
      <Container>
        <div className="d-flex justify-content-between align-items-center py-4">
          <h3>Submitted Addresses:</h3>
          <Button onClick={handleShow}>+ Add New</Button>
        </div>
        <Row>
          {submittedAddresses?.data?.length > 0 ? (
            <div style={{ display: "flex", gap: "20px" }}>
              {submittedAddresses?.data?.map((address, index) => (
                <Col lg={6} md={12}>
                  <div className="address-container" key={index}>
                    <Form.Check
                      className=""
                      type="radio"
                      checked={address._id === selectAddressId}
                      onChange={() => setSelectAddressId(address._id)}
                    />
                    <h4>Address {index + 1}</h4>
                    <div className="address-item">
                      <span className="address-label">First Name:</span>
                      <span className="address-value">{address.firstName}</span>
                    </div>
                    <div className="address-item">
                      <span className="address-label">Last Name:</span>
                      <span className="address-value">{address.lastName}</span>
                    </div>
                    <div className="address-item">
                      <span className="address-label">Address:</span>
                      <span className="address-value">{address.address}</span>
                    </div>
                    <div className="address-item">
                      <span className="address-label">City:</span>
                      <span className="address-value">{address.city}</span>
                    </div>
                    <div className="address-item">
                      <span className="address-label">State:</span>
                      <span className="address-value">{address.state}</span>
                    </div>
                    <div className="address-item">
                      <span className="address-label">Pincode:</span>
                      <span className="address-value">{address.pincode}</span>
                    </div>
                    <div className="address-item">
                      <span className="address-label">Phone:</span>
                      <span className="address-value">
                        {address.phoneNumber}
                      </span>
                    </div>
                    <Button
                      onClick={() => {
                        handleUpdate(address);
                        setIsUpdating(true);
                        handleShow();
                      }}
                      variant="primary"
                    >
                      Update Address
                    </Button>
                  </div>
                </Col>
              ))}
            </div>
          ) : (
            "Not address found !"
          )}
        </Row>
        {/* <button className="btn btn-success d-flex justify-content-end" onClick={()=>paymentSubmit()}>Process To Payment</button> */}
      </Container>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={(e) => submitData(e)}>
              <Row className="mt-5">
                <Col lg={6}>
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
                        value={selectedAddress?.firstName || ""}
                        onChange={(e) =>
                          setSelectedAddress({
                            ...selectedAddress,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Last Name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Your First Name"
                        name="lastName"
                        value={selectedAddress?.lastName || ""}
                        onChange={(e) =>
                          setSelectedAddress({
                            ...selectedAddress,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Address"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Your First Name"
                        name="address"
                        value={selectedAddress?.address || ""}
                        onChange={(e) =>
                          setSelectedAddress({
                            ...selectedAddress,
                            address: e.target.value,
                          })
                        }
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="City"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Your First Name"
                        name="city"
                        value={selectedAddress?.city || ""}
                        onChange={(e) =>
                          setSelectedAddress({
                            ...selectedAddress,
                            city: e.target.value,
                          })
                        }
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="State"
                      className="mb-3"
                    >
                      <Form.Select
                        defaultValue="select a state"
                        name="state"
                        value={selectedAddress?.state || ""}
                        onChange={(e) =>
                          setSelectedAddress({
                            ...selectedAddress,
                            state: e.target.value,
                          })
                        }
                      >
                        {state.map((item) => (
                          <option value={item}>{item}</option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="pincode"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Your First Name"
                        name="pincode"
                        value={selectedAddress?.pincode || ""}
                        onChange={(e) =>
                          setSelectedAddress({
                            ...selectedAddress,
                            pincode: e.target.value,
                          })
                        }
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="phone number"
                      className="mb-3"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Enter Your First Name"
                        name="phoneNumber"
                        value={selectedAddress?.phoneNumber || ""}
                        onChange={(e) =>
                          setSelectedAddress({
                            ...selectedAddress,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              {isUpdating ? (
                // Render Update Address button when updating
                <Button onClick={updateAddress} variant="success">
                  Update Address
                </Button>
              ) : (
                // Render Submit button when not updating
                <Button onClick={submitData} variant="success">
                  Submit
                </Button>
              )}
            </Form>
          </Container>
        </Modal.Body>
      </Modal>

      <Container className="mt-5">
        {orderProduct.map((item, index) => {
          return (
            <div className="main-order-list">
              <div className="inner-oredr-list">
                <div className="image-part">
                  <img src={item?.product?.image[0]} alt="" width={"100px"} />
                </div>
                <div className="description">
                  <h6>{item?.product?.name}</h6>
                  <div className="toggle-product">
                    <button onClick={() => decrement(index)}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <div className="cart-quantity">{item?.quantity}</div>
                    <button
                      onClick={() => increment(index, item.product.stock)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <h6>{item?.product?.price}</h6>
                </div>
              </div>
            </div>
          );
        })}
        <Button onClick={() => handleSelectAddress()} variant="success">
          Process Order
        </Button>
      </Container>
    </>
  );
};

export default CheckOut;
