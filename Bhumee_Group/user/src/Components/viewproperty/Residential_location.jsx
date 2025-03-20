import React from "react";
import gps_resi from "../viewproperty/residentimages/gps_resi.png";

function Residential_location() {

    return (
        <>
            <div className="bg-gradient from-gray-100 to-gray-500 bg-gradient-to-b h-36 pl-4 sm:h-72">
                <div className="text-slate-100 pt-20 pl-4 sm:pl-44 text-x sm:text-5xl font-bold subpixel-antialiased">
                    Kohinoor Kaleido
                </div>

                <div className="flex flex-row sm:flex-row  pl-4 sm:pl-44  text-red-600">
                    <img
                        src={gps_resi}
                        className="h-4 bg-white rounded  sm:h-6 sm:bg-white sm:rounded"
                    />
                    <span className="ml-2 text-xs sm:ml-4 text-slate-100">
                        {" "}
                        Wagholi Pune{" "}
                    </span>
                </div>
            </div>
        </>
    )
}

export default Residential_location;