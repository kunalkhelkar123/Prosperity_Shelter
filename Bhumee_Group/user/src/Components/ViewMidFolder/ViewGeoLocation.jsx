import React from "react";

function ViewGeoLocation() {

  return (
    <div className="p-5">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7563.837361926179!2d73.73427874277806!3d18.577704549921943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbe4d114d579%3A0xfec1d303cfb8941a!2sBlue%20Ridge%20Town%20Pune%2C%20Phase%201%2C%20Hinjawadi%20Rajiv%20Gandhi%20Infotech%20Park%2C%20Hinjawadi%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411057!5e0!3m2!1sen!2sin!4v1710489315952!5m2!1sen!2sin"
        className="w-[100%] h-[275px] sm:h-[500px] "
        style={{border:0}}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}

export default ViewGeoLocation;
