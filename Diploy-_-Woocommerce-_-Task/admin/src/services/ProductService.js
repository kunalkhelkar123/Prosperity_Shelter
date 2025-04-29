import axios from "axios";

const API = "/api/products";
const DeleteAPI = "/api/deleteproducts";

const UserAPI = "/api/Allproducts";

const token = () => sessionStorage.getItem("token");

const createProduct = (product) =>
  axios.post(API, product, {
    headers: { Authorization: `Bearer ${token()}` },
  });

const getProducts = () =>
  axios
    .get(API, {
      headers: { Authorization: `Bearer ${token()}` },
    })
    .then((res) => res.data);

const getAllProducts = () => axios.get(UserAPI).then((res) => res.data);

const deleteProducts = (id) => {
  // console.log("id ", id);
  axios.post( DeleteAPI, { id },
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    )
    .then((res) => res.data);
};

export default { createProduct, getProducts, getAllProducts, deleteProducts };
