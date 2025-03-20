import React from "react";
import dummyImage from "../ViewMidFolder/assets/Buildings.jpg";
import ViewAccordion from "../ViewMidFolder/ViewAccordion";

function ProjectConfigurationDown() {
  return (
    <>
      <div className="block bg-white border border-gray-200 rounded-lg shadow  lg:py-5 mt-5">
        <div className="flex flex-wrap flex-col justify-center gap-6 p-6 sm:justify-around mt-5 ">
          <h5 className=" mt-[-20px] text-start text-2xl font-bold tracking-tight  ">
            Project Configuration
          </h5>
          <div className="flex flex-wrap flex-col justify-center gap-6 p-6 md:flex-row md:justify-evenly md:items-center mt-[-20px]">
            <img src={dummyImage} alt="property-img" srcset="" />
            <div>
              <h5>2bhk, 2.5bhk, 4bhk</h5>
              <p className="">Price : 56 Lakh onwards</p>
              <p> MahaRa : P512700000E</p>
            </div>
            <div>
              <span className="bg-yellow-200 p-[10px] rounded-xl font-medium">
                590 - 957 / sq. ft
              </span>
            </div>
          </div>
        </div>
        <ViewAccordion />
       
      </div>
    </>
  );
}

export default ProjectConfigurationDown;
