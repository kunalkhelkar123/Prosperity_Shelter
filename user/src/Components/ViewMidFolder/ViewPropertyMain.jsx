import React from "react";
import dummyImage from "../ViewMidFolder/assets/Buildings.jpg";
import DescriptiveCardContainer from "../ViewMidFolder/DescriptiveCardContainer";
import ProjectConfigurationDown from "../ViewMidFolder/ProjectConfigurationDown";

let picture_Array = [2, 2, 3, 4, 4, 5, 6, 7];
let icons_Array = [{icon:"fa-solid fa-house",heading:"Type",Description:"Residential"},{icon:"fa-solid fa-users",heading:"MahaRera",Description:"P52100030356"},{icon:"fa-solid fa-bed",heading:"Type",Description:"2bhk, 2.5bhk & 3bhk"},{icon:"fa-solid fa-key",heading:"Configure",Description:"560 - 957 sq.ft"}];
// let arr_content= [{heading:"Type",Description:"Residential"},{heading:"Type",Description:"Residential"},{heading:"Type",Description:"Residential"},{heading:"Type",Description:"Residential"}]
let project = {
  titleName: "About Project",

  titleValue: "Welworth Purnam",
  titleDesc:
    "Welworth Realty is the developer of Purnam&nbsp;property. Welworth has always set higher standards in terms of quality, durability, and perception since its founding in 1987, with 20 projects completed on schedule and more on the way in the coming years",
};

let builder = {
  titleName: "About Builder",
  titleValue: "Welworth",
  titleDesc:
    "Welworth Realty was founded in 1987, and since then, it has completed 20 projects on time, with many more on the way in the coming years. Welworth has always set higher standards in terms of quality, durability, and perception.",
};

function ViewPropertyMain() {
  return (
    <>
      <div className="block bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 lg:py-5">
        <div className="flex flex-row justify-center flex-wrap gap-4 p-4 lg:justify-center sm:justify-center sm:py-[20px] sm:px-[12px]">
          {picture_Array.slice(0, 4).map((ele, index) => {
            return (
              <img
                key={index}
                className="h-32 sm:h-64 rounded-lg mb-4 sm:mb-0"
                src={dummyImage}
                alt="image description"
              />
            );
          })}
        </div>
      </div>

      <div className="block bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 lg:py-5 flex flex-wrap justify-center gap-6 p-6 sm:justify-around mt-5 ">
        {icons_Array.map((ele) => {
          return (
            <div className="px-5 flex flex-col justify-center items-center gap-[2px] w-[190px] h-[115px]">
              <p className="text-[30px]"><i className=  {ele.icon}></i></p>
              <h2 className="font-5 text-blue-900 mt-[10px]">{ele.heading}</h2>
              <p className="text-green-800">{ele.Description}</p>
            
            </div>
          );
        })}
      </div>
      <DescriptiveCardContainer
        title={project.titleName}
        titleValue={project.titleValue}
        titleDesc={project.titleDesc}
      />
      <DescriptiveCardContainer
        title={builder.titleName}
        titleValue={builder.titleValue}
        titleDesc={builder.titleDesc}
      />
      <ProjectConfigurationDown/>
    </>
  );
}

export default ViewPropertyMain;
