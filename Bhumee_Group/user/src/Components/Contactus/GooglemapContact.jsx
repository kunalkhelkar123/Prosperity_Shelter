const GoogleMapsGrid = () => {
  return (
    <div className="p-4 space-y-6 bg-blue-100">
      {/* Top Full-Width Map */}
      <div className="relative w-[70%] flex flex-col h-[500px] shadow-lg rounded-lg overflow-hidden justify-center items-center mx-auto">
        <div className="absolute top-2 left-2 bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-md shadow-md z-10">
          Reality One
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15137.880837170991!2d73.85946193652345!3d18.46234856814652!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ebdf57282d0d%3A0xf879ad1101fb1703!2sProsperity%20Shelters!5e0!3m2!1sen!2sin!4v1738321158516!5m2!1sen!2sin"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Reality One"
        ></iframe>
      </div>

      {/* Bottom Two Maps Side by Side */}
      {/* <div className="grid grid-cols-1 flex justify-center items-center md:grid-cols-2 gap-6"> */}
        {/* Left Map */}
        {/* <div className="relative w-full h-[500px] shadow-lg rounded-lg overflow-hidden">
          <div className="absolute top-2 left-2 bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-md shadow-md z-10">
            Victory Realty - East Pune
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7564.565149888073!2d73.944418!3d18.561295000000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c33708de5e97%3A0xc0d3fb9c21c81b79!2sVictory%20Realty%20-%20East%20Pune!5e0!3m2!1sen!2sus!4v1738323629724!5m2!1sen!2sus"
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Victory Realty - East Pune"
          ></iframe>
        </div> */}

        {/* Right Map */}
        {/* <div className="relative w-full h-[500px] shadow-lg rounded-lg overflow-hidden">
          <div className="absolute top-2 left-2 bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-md shadow-md z-10">
            The Stellar Complex
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7562.696439666685!2d73.747604!3d18.603401!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbb33121b2b5%3A0xdd273e6e2ddd1f5f!2sThe%20Stellar%20Complex!5e0!3m2!1sen!2sus!4v1738323675904!5m2!1sen!2sus"
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="The Stellar Complex"
          ></iframe>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default GoogleMapsGrid;
