import React from "react";
import City from "../homepage/city.jpeg";

const Homepage_latest_blog = () => {
  const blogs = [
    {
      id: 1,
      
      date1: "May 8, 2024",
      title: "Securing Your Golden Years: HomiGrow's Guide to Real Estate Investment for Retirement",
      descreption:
        " Retirement planning often involves exploring various investment avenues to secure financial stability during the golden years. ",
        // link:"https://www.linkedin.com/pulse/securing-your-golden-years-corespaces-guide-real-estate-xfmlf/?trackingId=1DF9n1MbKpR4ANMdP%2BtM%2FA%3D%3D",
        img_path:"https://media.licdn.com/dms/image/D4D12AQFya_8rVE4IGg/article-cover_image-shrink_720_1280/0/1715155671717?e=1721865600&v=beta&t=guwheYyE7qzUV06ePuoBP4XkK8x1qXiyNftJb5iW_g0"
    },
    {
      id: 2,
      
      date1: "May 15, 2024",
      title: "Deciding Your Pune Property: Flats, Villas, or Land – Which Holds Your Key to Success?",
      descreption:
        " Let's explore the advantages of flats (apartments), villas (bungalows), and plots of land to help you make an informed decision.HomiGrow Realty will help you according to your needs and requirement.",
        link:"https://www.linkedin.com/pulse/deciding-your-pune-property-flats-villas-land-which-holds-rngkf/?trackingId=RVX5dEJkS0eD1svOnEuFjA%3D%3D",
        img_path:"https://media.licdn.com/dms/image/D4D12AQG7N6IrOI4_jA/article-cover_image-shrink_423_752/0/1715767610272?e=1721865600&v=beta&t=f_qKM9QHBIzfwn9pr_We_FoneZYjJoggiaLvxb1fHgE"
    },
    {
      id: 3,
      
      date1: "March 7, 2024",
      title: "Rising Tide in Pune's Premium Real Estate Market",
      descreption:
        "The real estate landscape in Pune is witnessing a notable surge, particularly in the premium segment, signifying a robust growth trend. According to a recent report, the sale of homes in the Rs 1-2 crore category saw an impressive 33% growth in 2023 compared to  previous year.",
        link:"https://www.linkedin.com/pulse/rising-tide-punes-premium-real-estate-market-corespace-realty-wso0f/?trackingId=YDuVnFmb6cBYmayG9ZrtIQ%3D%3D",
        img_path:"https://media.licdn.com/dms/image/D4D12AQHYWAIvfHdQTA/article-cover_image-shrink_720_1280/0/1709795263746?e=1721865600&v=beta&t=DxUsLz_A2BfDIZyyTOBiugNnBn04zMJXIzTtEeZeqIo"
    }
  ];

    return (
        <>
          <section className="py-10">
            <h1 className="text-center font-sans text-4xl sm:text-5xl font-bold mb-8">
              Our Latest Blog
            </h1>
            <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-3">
              {blogs.map((blog) => {
                return (
                  <article
                    key={blog.id}
                    className="mx-auto my-4 flex w-full flex-col  overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 transition duration-300 transform hover:-translate-y-2 hover:shadow-lg"
                  >
                    <a href="#">
                      <img
                        src={blog.img_path}
                        className="h-50 w-full object-cover "
                        alt=""
                      />
                      <div className="flex-col h-ful justify-between px-6 py-5 ">
                        <span className="mb-2 flex items-center text-sm font-semibold ">
                          {blog.date1}
                        </span>
                        <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                          {blog.title}
                        </h3>
                        <p className="mb-4 text-base text-gray-900">{blog.descreption.slice(0,200)}</p>
                        <a href={blog.link} target="_blank"><span  className="inline-block cursor-pointer select-none  border border-[#FFF848] bg-[#FFF848] hover:bg-[#390255]  hover:border-[#390255] hover:text-white px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-[#390255] no-underline shadow-sm">
                          Read More
                        </span></a>
                      </div>
                    </a>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      );
    };
    export default Homepage_latest_blog;
