import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddressUpdateModel = ({ show, handleClose, address, onUpdate }) => {
  const [updatedAddress, setUpdatedAddress] = useState(address);
  const loginId = JSON.parse(localStorage.getItem("user_login_record"));
  const finalUserId = loginId._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAddress({
      ...updatedAddress,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/${finalUserId}/addresses/${address._id}`,
        updatedAddress
      );
      onUpdate(response.data); // Assuming the API returns the updated address data
      handleClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating address: ", error);
    }
  };
  
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={updatedAddress.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formFirstName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={updatedAddress.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={updatedAddress.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>city</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={updatedAddress.city}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={updatedAddress.state}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>pincode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={updatedAddress.pincode}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>PhoneNumber</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={updatedAddress.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Other address fields... */}

            <Button variant="primary" type="submit">
              Update Address
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddressUpdateModel;
