import React from "react";
import property_img from './Mortgage_asset/property_img.jpg'

function Mortgage_property() {

    return (
        <>
            <div className="p-[20px] rounded-[10px]">
                <div className="flex flex-col justify-center items-center ">
                    <div className="py-[20px]">
                        <p className="text-[24px]"><strong>Similar Property</strong></p>
                    </div>
                    <div className="flex flex-col justify-center gap-[20px] items-center p-[25px] bg-white">
                        <div className=" w-[100%] bg-[#fff] rounded-lg border-2 border-grey  ">
                            <div className="flex flex-col justify-center items-center gap-[10px] px-[25px] py-[15px]">
                                <div><img src={property_img} /></div>
                                <div className="flex flex-col justify-center items-baseline sm:ml-[-52px] md:ml-[0px]">
                                    <div className="text-[14px]"><p><strong>Saheel ITrends Homes</strong></p></div>
                                    <div className="text-[14px] flex flex-row justify-center items-center gap-[10px] flex ">
                                        <div className="text-orange-900"><p><i className="fa-solid fa-location-dot"></i></p></div>
                                        <div><p> HINJEWADI</p></div>
                                        <div><p>Pune</p></div>
                                    </div>

                                    <div className="text-[14px] "><p><strong className="text-orange-900">Configuration:</strong> 2 BHK</p></div>
                                </div>
                            </div>
                        </div>

                        <div className=" w-[100%] bg-[#fff] rounded-lg border-2 border-grey  ">
                            <div className="flex flex-col justify-center items-center gap-[10px] px-[35px] py-[15px]">
                                <div><img src={property_img} /></div>
                                <div className="flex flex-col justify-center items-baseline ">
                                    <div className="text-[14px]"><p><strong>Shapoorji Pallonji Sensorium</strong></p></div>
                                    <div className="text-[14px] flex flex-row justify-center items-center gap-[10px] flex ">
                                        <div className="text-orange-900"><p><i className="fa-solid fa-location-dot"></i></p></div>
                                        <div><p> HINJEWADI</p></div>
                                        <div><p>Pune</p></div>
                                    </div>

                                    <div className="text-[14px] "><p><strong className="text-orange-900">Configuration:</strong> 2 & 3BHK</p></div>
                                </div>
                            </div>
                        </div>

                        <div className=" w-[100%] bg-[#fff] rounded-lg border-2 border-grey  ">
                            <div className="flex flex-col justify-center items-center gap-[10px] px-[35px] py-[15px]">
                                <div><img src={property_img} /></div>
                                <div className="flex flex-col justify-center items-baseline ">
                                    <div className="text-[14px]"><p><strong>Kohinoor Sportsville</strong></p></div>
                                    <div className="text-[14px] flex flex-row justify-center items-center gap-[10px] flex ">
                                        <div className="text-orange-900"><p><i className="fa-solid fa-location-dot"></i></p></div>
                                        <div><p> HINJEWADI</p></div>
                                        <div><p>Pune</p></div>
                                    </div>

                                    <div className="text-[14px] "><p><strong className="text-orange-900">Configuration:</strong> 1, 2, & 3BHK</p></div>
                                </div>
                            </div>
                        </div>

                        <div className="p-[10px] bg-purple-900 rounded-[10px] ">
                            <button className="text-white">View all properties</button>
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Mortgage_property;