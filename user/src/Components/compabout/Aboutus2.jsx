import React from "react";

function aboutus2() {
  return (
    <>
      <div className="px-4 sm:px-8 md:px-16">
        {/* Video and Text Section */}
        <div className="flex flex-col sm:flex-row sm:gap-10 md:gap-20 items-center mt-8">
          <div className="flex justify-center w-[75%] overflow-hidden">
            <video
              className="h-[150px] w-[400px] sm:h-[250px] sm:w-[350px] md:h-[500px] md:w-[550px] object-cover"
              autoPlay
              loop
              muted
            >
              <source
                src="https://docs.material-tailwind.com/demo.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="mt-6 sm:mt-0 flex flex-col items-center text-center sm:text-left md:items-start">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              We Help People To Find Best Home
            </h2>
            <p className="text-sm sm:text-lg leading-relaxed text-gray-600">
              We’re a full-service real estate consultancy firm, offering
              commercial and residential real estate, property management, and
              corporate relocation. Our team of highly qualified and experienced
              real estate professionals is devoted to helping you find the right
              property and delivering the highest returns on your investment.
              We’re present in major cities across the country, including
              Mumbai, Nagpur, Delhi, Chennai, Hyderabad, and Bengaluru.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:justify-evenly sm:gap-4 md:gap-16 2xl:gap-24">
            {[
              {
                icon: "location_city",
                text: "Search Property Anywhere",
              },
              {
                icon: "landscape_2",
                text: "Professional Property Expert",
              },
              {
                icon: "crowdsource",
                text: "Assured Return on Investment",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 hover:bg-yellow-400 p-4 hover:rounded-lg transition duration-300"
              >
                <span className="material-symbols-outlined text-purple-900 bg-red-100 p-3 rounded-full">
                  {feature.icon}
                </span>
                <span className="text-base font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-10 bg-yellow-200 border-l-4 border-red-700 p-4 sm:mx-5 rounded-md">
          <p className="text-center sm:text-left text-sm sm:text-lg font-bold">
            Find a place that suits all your real estate needs and desires.
          </p>
        </div>

        {/* Contact Us Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-gray-100 text-red-500 font-bold py-2 px-6 rounded-md hover:bg-red-500 hover:text-white transition duration-300">
            Contact Us
          </button>
        </div>

        {/* Our Services Section */}
        <div className="mt-12">
          <div className="flex flex-col items-center">
            <button className="bg-yellow-400 text-purple-900 hover:bg-purple-900 hover:text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Our Services
            </button>
            <h2 className="text-2xl sm:text-4xl font-bold mt-6">
              Our Main Focus
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default aboutus2;
