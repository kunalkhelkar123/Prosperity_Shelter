import React from "react";

function Property_DOCS() {

    return (
        <>
            <div className=" flex flex-col justify-center items-center gap-[20px] pb-[20px]">
                <div className="text-[24px]"><strong>Property Documents</strong></div>
                <div className="flex flex-col justify-center items-center gap-[10px] p-[18px] bg-white lg:p-[25px] sm:p-[25px] md:p-[18px]">

                    <div className="flex flex-row justify-between items-center w-[225px] md:w-[225px] lg:w-[260px] sm:w-[260px]">

                        <div className="flex flex-row justify-center items-center gap-[10px]">
                            <div className="">
                                <i className="fa-regular fa-file"></i>
                            </div>
                            <div>
                                <p>Property Presentation </p>

                            </div>
                        </div>
                        <div className="text-[#a7a7a7]">
                            <i className="fa-solid fa-download"></i>
                        </div>

                    </div>
                    <div>
                        <hr className="w-[210px] h-px my-[10px] bg-gray-200  dark:bg-gray-700" />
                    </div>
                    <div className="flex flex-row justify-between items-center w-[225px] md:w-[225px] lg:w-[260px] sm:w-[260px]">
                        <div className="flex flex-row justify-center items-center gap-[10px]">
                            <div >
                                <i className="fa-regular fa-file"></i>
                            </div>
                            <div>
                                <p>Energetic Certificate</p>

                            </div>


                        </div>
                        <div className="text-[#a7a7a7]">
                            <i className="fa-solid fa-download"></i>
                        </div>
                    </div>
                    <div>
                        <hr className="w-[210px] h-[1px] my-[10px] bg-gray-200  dark:bg-gray-700" />
                    </div>
                    <div className="flex flex-row justify-between items-center w-[225px] md:w-[225px] lg:w-[260px] sm:w-[260px]">

                        <div className="flex flex-row justify-center items-center gap-[10px]">
                            <div className="text-grey">
                                <i className="fa-regular fa-file"></i>
                            </div>
                            <div>
                                <p>Property Plans </p>

                            </div>
                        </div>
                        <div className="text-[#a7a7a7]">
                            <i className="fa-solid fa-download"></i>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Property_DOCS;