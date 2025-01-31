/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import image from '../homepage/city.jpeg';
import DummyTestCarousel from './DummyTestCarousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Link} from 'react-router-dom';
import axios from 'axios';


function DummyTest() {
  const [dummyArr, setAllProperties] = useState([]);
  //
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/property/properties');
        // console.log('Data from database using proxy', response.data);
        setAllProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="flex flex-col  gap-2 items-center lg:flex-row lg:justify-equal py-7 p-5">
        <div className="flex flex-col justify-evenly gap-3 leading-4 items-start md:w-[65%] lg:w-[100%] p-3  bg-fuchsia-950  rounded-lg shadow hover:bg-yellow-400">
          <img className="w-[100%] h-[100%]" src={image} alt="" />
          <h5 className=" text-lg font-semibold text-white">Best Sellers in Pune</h5>
          <p className="text-white text-sm">
            The latest residential offerings from the best builders in Pune, handpicked by our team of experts just for you and backed by our widely acclaimed transaction and financial services.
          </p>
          <Link to="/Investmentapp">
            <button className="border-[#FFF848] bg-[#FFF848] hover:bg-[#390255]  hover:border-[#390255] hover:text-white p-2 mt-4 rounded-lg ">View All</button>
          </Link>
        </div>

        <div className=" md:w-[75%] w-[100%] container mx-auto px-4">
          <Slider {...settings}>
            {dummyArr.map((ele) => {
              return (
                <div key={ele}>
                  <DummyTestCarousel ele={ele} />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default DummyTest;
