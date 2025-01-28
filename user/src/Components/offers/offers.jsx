import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

const UploadHeadingAndImage = () => {
    const [heading, setHeading] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        try {
            const token = sessionStorage.getItem("token");
            const admin = JSON.parse(sessionStorage.getItem("admin"));

            // console.log("admin ==> ", admin)
            if (!token || !admin || admin.role !== "admin") {
                navigate("/admin");
            }
        }
        catch (error) {
            navigate("/admin");

        }
    }, [navigate]);




    const handleHeadingChange = (e) => {
        setHeading(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const fetchOffers = async () => {
        try {
            const response = await axios.get("api/client/getoffers");
            setOffers(response.data);
        } catch (error) {
            console.error("Error fetching offers:", error);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!heading || !image) {
            setMessage("Please provide both heading and image.");
            return;
        }

        const formData = new FormData();
        formData.append("heading", heading);
        formData.append("image", image);

        try {
            const response = await axios.post("api/client/addoffers", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                alert("Data saved successfully");
                setMessage(response.data.message || "Data uploaded successfully!");
                fetchOffers();
            }
        } catch (error) {
            console.error("Error uploading data:", error);
            setMessage("Failed to upload data. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`api/client/deleteoffers/${id}`);
            setMessage("Offer deleted successfully.");
            fetchOffers();
        } catch (error) {
            console.error("Error deleting offer:", error);
            setMessage("Failed to delete offer. Please try again.");
        }
    };

    return (
        <div className="min-h-screen mt-20 bg-gray-50 flex flex-col items-center py-8">
            <NavBar />
            <div className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Upload Offers Heading and Image
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="heading" className="block text-lg font-medium text-gray-700 mb-2">
                            Offers Heading
                        </label>
                        <input
                            type="text"
                            id="heading"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter heading"
                            value={heading}
                            onChange={handleHeadingChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            className="w-full text-gray-700"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium text-lg py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-center text-lg text-gray-700 bg-gray-100 p-4 rounded-lg">
                        {message}
                    </p>
                )}
            </div>

            <div className="mt-12 w-full max-w-5xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Existing Offers</h2>
                <div className="overflow-x-auto">
                    {offers.length > 0 ? (
                        <table className="min-w-full bg-white rounded-lg mb-40 shadow-lg border border-gray-300">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="border border-gray-300 text-left px-6 py-3 text-lg font-semibold">
                                        Sr No
                                    </th>
                                    <th className="border border-gray-300 text-left px-6 py-3 text-lg font-semibold">
                                        Heading
                                    </th>
                                    <th className="border border-gray-300 text-left px-6 py-3 text-lg font-semibold">
                                        Image
                                    </th>
                                    <th className="border border-gray-300 text-center px-6 py-3 text-lg font-semibold">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {offers.map((offer, index) => (
                                    <tr
                                        key={offer.id}
                                        className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                            } hover:bg-gray-200 transition`}
                                    >
                                        <td className="border border-gray-300 px-6 py-4 text-gray-700">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-300 px-6 py-4 text-gray-700">
                                            {offer.heading}
                                        </td>
                                        <td className="border border-gray-300 px-6 py-4">
                                            <img
                                                src={offer.image}
                                                alt={offer.heading}
                                                className="h-28 w-28 object-cover rounded-md"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleDelete(offer.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-lg text-gray-500 py-6">No offers available.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default UploadHeadingAndImage;
