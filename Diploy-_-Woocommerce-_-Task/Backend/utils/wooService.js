const axios = require("axios");

// Setup WooCommerce API client
const wooClient = axios.create({
  baseURL: `http://localhost/wordpress/wp-json/wc/v3`,
  auth: {
    username: "ck_b707355f6bdd5ceb9dcefe149df1406fdf60b291", //CONSUMER key
    password: "cs_0f198394e1b94fb2022054f27e7bdd2a898d99ef", // CONSUMER_SECRET
  },
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to create a product on WooCommerce
const createWooProduct = async ({ name, description, price, imageUrl }) => {
  try {
    const data = {
      name: "Premium Quality",
      type: "simple",
      regular_price: "21.99",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
      short_description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      categories: [
        {
          id: 9,
        },
        {
          id: 14,
        },
      ],
      images: [
        {
          id: 42,
        },
        {
          src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg",
        },
      ],
    };
    const { response } = await wooClient.post("/products", data);

    console.log("✅ WooCommerce product created successfully:", response.id);
    return response;
  } catch (error) {
    console.error(
      "❌ WooCommerce Product Creation Error:",
      error.response?.data || error.message
    );
    return null;
  }
};

module.exports = { createWooProduct };
