import React from "react";
import Blogshowhome from "./Blogshowhome";

// import CryptoCard from "./CryptoCard";
// import "./CryptoList.css";

const BloghomesList = ({ coinsData }) => {
    return (
        <div className='crypto_list sm:grid sm:grid-cols-2 sm:justify-center  sm:items-center grid grid-cols-1  '>
            {coinsData.map((coin, index) => {
                return (
                    <Blogshowhome
                        key={index}
                        image={coin.image}
                        // name={coin.name}
                        price={coin.current_price}
                    />
                );
            })}
        </div>
    );
};

export default BloghomesList;
