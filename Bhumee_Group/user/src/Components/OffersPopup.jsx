import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const OffersPopup = ({ isOpen, onClose }) => {
    const [offers, setOffers] = useState([]);

    // Fetch offers from the backend
    const fetchOffers = async () => {
        try {
            const response = await axios.get("/api/client/getoffers");
            console.log("length", response.data.length)

            const datalength = response.data;
            if (datalength.length === 0) { // Correct check for empty array
                console.log("No offers available");
                onClose();
                // Optionally close the popup or handle the empty data case
            }
            setOffers(response.data); // Assuming response.data contains an array of image URLs
        } catch (error) {
            console.error("Error fetching offers:", error);
        }
    };

    // Fetch offers when the popup opens
    useEffect(() => {
        if (isOpen) {
            fetchOffers();
            // if (offers.length === 0) {
            //     onClose();
            // }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // useEffect(() => {
    //     if (offers.length === 0 && isOpen) {
    //         onClose();
    //     }
    // }, [offers, isOpen]);

    // if (!isOpen) return null;



    return (
        <div className="fixed inset-0 bg-black  bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-[650px] w-full ease-in-out scale-95 hover:scale-100">
                <div className="relative flex mt-[-20px]">
                    <h2 className="text-2xl mb-4">Our Offers</h2>
                    <button
                        onClick={onClose}
                        className="absolute top-1 right-4 text-2xl font-bold text-gray-600"
                    >
                        ×
                    </button>
                </div>
                {offers.length > 0 ? (
                    <Carousel
                        showThumbs={false}
                        showIndicators={false} // Removed dots
                        infiniteLoop
                        autoPlay
                        interval={2000}
                        className="max-h-[350px]"
                    >
                        {offers.map((offer, index) => (
                            <div key={index}>
                                <img
                                    src={offer.image}
                                    alt={`Offer ${index + 1}`}
                                    className="rounded-lg h-[380px]"
                                />
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    <p className="text-gray-500">No offers available at the moment.</p>
                )}
                <div className="flex justify-end mt-16 ">
                    <Link to={"/hotproperties"}>
                        <button
                            className="bg-[#390255] text-white px-2 py-2 mr-10 rounded"
                            style={{
                                position: 'relative',
                                zIndex: 20,
                            }}
                        >
                            Check all Properties
                        </button>
                    </Link>
                    <button
                        onClick={onClose}
                        className="bg-[#390255] text-white px-4 py-2 rounded"
                        style={{ zIndex: 10 }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
    
};

export default OffersPopup;
