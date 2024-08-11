import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../common/Header/Header";
import Collection_Topbar from "../../common/Collection-TopBar/Collection_Topbar";
import { Container, Table } from "react-bootstrap";

const Wishlist = () => {
  const [wishlistProduct, setWishlistProduct] = useState([]);

  const UserIdGet = JSON.parse(localStorage.getItem("user_login_record"));
  const UserId = UserIdGet?._id;

  let wishlistLength = localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlistProduct?.products?.length ?? 0)
  );

  const getWishlist = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/wishlist/${UserId}`)
      .then((res) => {
        // console.log('res get data',res.data);
        // console.log("res wishlist data", res.data);
        setWishlistProduct(res.data);
      });
  };
  console.log('wishlistProduct get data',wishlistProduct);
  


const DeleteProduct = async (id, index) => {
    try {
      const updatedWishlist = [...wishlistProduct.products];
      updatedWishlist.splice(index, 1);
      setWishlistProduct({ products: updatedWishlist });

      // Update local storage after deleting from wishlist
      localStorage.setItem("wishlistData", JSON.stringify(updatedWishlist));

      // Make API call to update wishlist in the backend
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/remove/wishlist/${UserId}/${id}`
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || [];
    setWishlistProduct({ products: wishlistData });
  }, []);
  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <Header />
      <Collection_Topbar />
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>sr</th>
              <th>product</th>
              <th>Title</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { wishlistProduct?.products?.length>0 && wishlistProduct?.products?.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item?.image?.[0]} alt="" width={"100px"} />
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
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
      </Container>
    </>
  );
};

export default Wishlist;
