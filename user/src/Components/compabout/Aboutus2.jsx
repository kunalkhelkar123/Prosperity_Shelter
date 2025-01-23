import React from "react";

function aboutus2() {
  return (
    <>
      <div className="sm:ml-4 sm:mr-4">
        <div className=" sm:flex sm:justify-center sm:gap-10 md:gap-20">
          <div className="flex justify-center">
            <video
              className="h-[220px] w-100% flex justify-center rounded-lg md:h-[500px] md:w-[550px]  sm:h-[250px] sm:w-[350px]  items-center "
              controls
            >
              <source
                src="https://docs.material-tailwind.com/demo.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div
            className=" mt-4 text-xl flex  justify-center flex-col items-center border-x-red-400
          md:h-[450px] md:w-[590px] sm:h-[200px] sm:w-[350px] sm:overflow-x-auto"
          >
            <div className="md:text-3xl md:mt-5 sm:text-3xl sm:mt-1 font-semibold ml-4">
              We Help People To Find Best Home
            </div>
            <div
              className=" h-[100px]  mt-5 overflow-x-auto  ml-5 mr-5 text-xs
              md:text-m md:font-sans  md:mt-4 md:leading-9  md:flex  md:justify-center md:flex-wrap  
            sm:text-lg   sm:leading-5 sm:flex sm:justify-center sm:flex-wrap sm:h-[350px]  sm:m-1.5
             "
            >
              We’re a full-service real estate consultancy firm, offering
              commercial and residential real estate, property management and
              corporate relocation. We mean to help you in settling on the most
              ideal property decision based on your requirements. The company
              has its significant focus on commercial and residential real
              estate, which includes investment and leasing properties. Our team
              of highly qualified and experienced real estate professionals are
              devoted to help you find the right property and are committed
              towards giving you the highest returns on your investment.We are
              known as one of the best emerging real estate services provider in
              Pune with a presence across all major cities in the country,
              including Mumbai, Nagpur, Delhi, Chennai, Hyderabad and Bengaluru.
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="">
          <div
            className="
      mt-8 ml-5 mr-5
      flex flex-col items-start text-left
      sm:flex-row sm:items-start sm:justify-evenly sm:gap-4 md:gap-16 2xl:gap-24 sm:mr-5
    "
          >
            <div className="flex gap-2 items-center hover:bg-yellow-400 p-3 hover:rounded-full">
              <div>
                <span className="material-symbols-outlined text-purple-900 bg-red-100 p-2 rounded-full">
                  location_city
                </span>
              </div>
              <div className="font-m">Search Property Anywhere</div>
            </div>

            <div className="flex gap-2 items-center hover:bg-yellow-400 p-3 hover:rounded-full">
              <div>
                <span className="material-symbols-outlined text-purple-900 bg-red-100 p-2 rounded-full">
                  landscape_2
                </span>
              </div>
              <div className="font-m">Professional Property Expert</div>
            </div>

            <div className="flex gap-2 items-center hover:bg-yellow-400 p-3 hover:rounded-full">
              <div>
                <span className="material-symbols-outlined text-purple-900 bg-red-100 p-2 rounded-full">
                  crowdsource
                </span>
              </div>
              <div className="font-m">Assured Return on Investment</div>
            </div>
          </div>

          <div
            className="
      h-12 w-full mt-10 bg-yellow-200 border-l-4 border-red-700 flex items-center justify-center
      sm:h-12 sm:w-70 sm:mt-10 sm:bg-yellow-400 sm:border-l-4 
      sm:border-red-700 sm:flex sm:items-center sm:justify-start sm:pl-4 sm:ml-5 sm:mr-8
    "
          >
            <div className="text-xs sm:text-xl font-bold">
              Find a place that suits all your real estate needs and desires.
            </div>
          </div>

          <div className="flex justify-center mt-10 items-center">
            <div className="h-10 w-40 font-bold bg-gray-100 text-red-500 text-center rounded-md pt-2">
              Contact Us
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-center ">
          <span
            className="  text-purple-900 bg-yellow-400 flex justify-center mb-4 hover:bg-purple-900 hover:text-white mt-8 sm:p-8 p-3 sm:text-2xl
              w-[250px] rounded-full  items-center font-bold  sm:bg-yellow-400 sm:flex sm:justify-center sm:text-purple-900
             sm:w-[250px] sm:rounded-full sm:h-10 sm:items-center sm:font-bold sm:mb-5 md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px] "
          >
            Our Services
          </span>
        </div>

        <div className=" font-bold flex justify-center text-2xl sm:text-4xl  mt-4 ">
          Our Main Focous
        </div>
      </div>
    </>
  );
}

export default aboutus2;
