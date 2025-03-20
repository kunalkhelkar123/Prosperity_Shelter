import React from 'react';
import image1 from './home3.avif'; 
import image2 from './home 7.jpg';

const Home = () => {
  return (
    <div>
      <div>
    <div className="bg-purpl-900 rounded-2xl mx-auto py-10 grid max-w-screen-xl grid-cols-1 text-white pl-6 pr-4 sm:px-20 lg:grid-cols-3 sm:grid-cols-2 mt-4  w-[470px] md:w-max sm:w-max ">
      {/* Column 1 */}
      <div className="col-span-1 w-[420px] h-[680px] flex flex-col justify-center text-center sm:text-left md:pr-10 max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg border border-gray-400 ml-5 ">
        {/* Title */}
        <div className="flex flex-col px-4 py-2">
  <h1 className="font-bold text-xl text-black">Kohinoor Estates</h1>
  <h1 className="font-bold text-xl text-black">Tathawade</h1>
</div>


      {/* Image */}
      <img src={image1} alt="Banner" className=" ml-[18px] h-64 w-full object-cover" />

      {/* Description */}
      <div className="p-4">
        <p className="text-base text-gray-800">
          <span className="font-bold">Description:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero.Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero.Lorem ipsum dolor 
        </p>
      </div>
      </div>

      
      <div className="col-span-2 lg:ml-[190px] xl:ml-[90px] 2xl:ml-[90px] mt-[70px]  gap-6 rounded-2xl bg-purple-300 p-5 sm:p-10 md:grid-cols-2  lg:mt-0">
        <div className="overflow-auto">
          <table className="w-full">
            <tbody>
          <tr>
                <th className="py-2 px-4 text-black text-left hover:underline bg-purple-500">Area</th>
                <td className="py-2 px-4 text-black text-right bg-purple-500">1400 sq. ft</td>
              </tr>
              <tr>
  <th className="py-2 px-4  text-black  text-left hover:underline">Quoted Price</th>
  <td className="py-2 px-4 text-black text-right ">$100,000</td>
</tr>
<tr>
  <th className="py-2 px-4  text-black  text-left hover:underline bg-purple-500">Property Type</th>
  <td className="py-2 px-4 text-black text-right bg-purple-500">Commercial</td>
</tr>
<tr>
  <th className="py-2 px-4   text-black  hover:underline text-left">Property Category</th>
  <td className="py-2 px-4 text-black text-right">A+</td>
</tr>
<tr>
  <th className="py-2 px-4   text-black  hover:underline text-left bg-purple-500">Tenant Type</th>
  <td className="py-2 px-4 text-black text-right bg-purple-500">Corporate</td>
</tr>
<tr>
  <th className="py-2 px-4   text-black  hover:underline text-left">Industry</th>
  <td className="py-2 px-4 text-black text-right ">Technology</td>
</tr>
<tr>
  <th className="py-2 px-4  text-black  hover:underline text-left bg-purple-500">Gross Rent</th>
  <td className="py-2 px-4 text-black text-right  bg-purple-500">$2,500</td>
</tr>
<tr>
  <th className="py-2 px-4  text-black  hover:underline text-left">Annual Rent</th>
  <td className="py-2 px-4 text-black text-right ">$30,000</td>
</tr>
<tr>
  <th className="py-2 px-4  text-black  hover:underline text-left bg-purple-500">Annual ROI</th>
  <td className="py-2 px-4 text-black text-right bg-purple-500">6%</td>
</tr>
<tr>
  <th className="py-2 px-4  text-black hover:underline text-left">Lock-in Period</th>
  <td className="py-2 px-4  text-black text-right ">5 Years</td>
</tr>
<tr>
  <th className="py-2 px-4  text-black hover:underline text-left bg-purple-500">Gross Rent</th>
  <td className="py-2 px-4  text-black text-right bg-purple-500">$2,500</td>
</tr>
<tr>
  <th className="py-2 px-4  text-black  hover:underline text-left">Annual Rent</th>
  <td className="py-2 px-4  text-black text-right ">$30,000</td>
</tr>
<tr>
  <th className="py-2 px-4  text-black  hover:underline text-left bg-purple-500">Annual ROI</th>
  <td className="py-2 px-4  text-black text-right bg-purple-500">6%</td>
</tr>
<tr>
  <th className="py-2 px-4  text-black hover:underline text-left">Lock-in Period</th>
  <td className="py-2 px-4 text-black text-right ">5 Years</td>
</tr>
<tr>
  <th className="py-2 px-4 text-black  hover:underline text-left  bg-purple-500"> Period</th>
  <td className="py-2 px-4 text-black text-right bg-purple-500">45 Years</td>
</tr>

            </tbody>
          </table>
        </div>
      </div>


      
    </div>




<div>
<section className="py-10 2xl:mr-[400px] leading-6 text-black-900 sm:py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-xl text-center">
      <h2 className="text-4xl 2xl:ml-[270px] md:ml-[130px] lg:ml-[130px] font-bold leading-9 sm:text-4xl sm:leading-tight">Wide  Features</h2>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-6 divide-blue-200 sm:grid-cols-2 md:gap-8 lg:mt-16 sm:ml-[200px] lg:grid-cols-4 lg:divide-x sm:w-max w-[400px]">
      <div className="border-b border-blue-200 py-10 px-6 lg:border-b-0">
        <div className="flex items-center">
          <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
            <span className="absolute -top-4 h-2 w-full bg-purple-900   transition-transform transform hover:scale-11  "></span>
            328
          </h3>
          <span className="ml-3 text-xl  font-medium capitalize  transition-transform transform hover:scale-125">Sq Feet</span>
        </div>
      </div>

      <div className="border-b border-purple-200 py-10 px-6 lg:border-b-0">
        <div className="flex items-center">
          <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
            <span className="absolute -top-4 h-2 w-[65px]  bg-purple-900"></span>
            16
          </h3>
          <span className="ml-3 text-xl  transition-transform transform hover:scale-110  font-medium capitalize">Projects</span>
        </div>
      </div>

      <div className="border-b border-blue-200 py-10 px-6 lg:border-b-0">
        <div className="flex items-center">
          <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
            <span className="absolute -top-4 h-2 w-full bg-purple-900"></span>
            41+
          </h3>
          <span className="ml-3 text-xl  transition-transform transform hover:scale-110  font-medium capitalize">Flats</span>
        </div>
      </div>

      <div className="border-b border-blue-200 py-10 px-6 lg:border-b-0">
        <div className="flex items-center">
          <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
            <span className="absolute -top-4 h-2 w-full bg-purple-900"></span>
            99%
          </h3>
          <span className="ml-3 text-xl  transition-transform transform hover:scale-110  font-medium capitalize">Happy Customers</span>
        </div>
      </div>
    </div>
  </div>
</section>

</div>

</div>



<div>

<div className=" text-base text-gray-900 sm:px-10">
  <div className="text-base text-gray-900">
    <div className="mx-auto  w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
      <div className="mx-2 pt-12 text-center md:mx-auto md:w-2/3 md:pb-12">
        <h1 className="mb-4 text-3xl transition-transform transform hover:scale-110 font-black-500 sm:text-5xl xl:text-4xl">Contact us now</h1>
        <div className="text-lg sm:text-xl xl:text-xl">
          <div className="text-gray-900">
            <p className="mb-4 transition-transform transform hover:scale-110">Feel Free To Contact Us About Properties </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className=" shadow-xl mx-auto mb-20 flex w-[460px] sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[900px]  border-gray-200 max-w-screen-lg flex-col overflow-hidden rounded-xl text-gray-900 md:flex-row md:border  " style={{ boxShadow: "0 4px 10px rgba(128, 0, 128, 0.5), 0 1px 6px rgba(128, 0, 128, 0.3)" }}>
    <form className="mx-auto w-full max-w-xl border-gray-200 px-10 py-8 md:px-8">
      <div className="mb-4"><label className="text mb-2  block font-medium" for="email">Your e-mail:</label><input className="w-full rounded  border border-gray-300 px-3 py-2  ring-purple-900 " id="email" type="email" required="" placeholder='Write Your Email Here' /></div>
      <div className="mb-4"><label className="text mb-2 block font-medium" for="subject">Subject:</label><input className="w-full rounded border border-gray-300 px-3 py-2 outline-none ring-purple-900 " id="subject" type="subject" required="" placeholder='Write Your Subject Here' /></div>
      <div className="mb-4"><label className="text mb-2 block font-medium" for="message">Message:</label><textarea className="h-52 w-full rounded border border-gray-300 px-3 py-2 outline-none ring-purple-900 " id="message" required="" placeholder='Drop Your Message'></textarea></div>
      <div className="flex items-center">
        <div className="flex-1"></div>
        <button className="rounded-xl bg-purple-900 px-4 py-3 text-center font-bold text-white hover:bg-yellow-500" type="submit">Send message</button>
      </div>
    </form>
    <div className="mt-10 bg-purple-900 px-10 py-8 text-gray-100 md:mt-0 md:ml-auto">
      <div className="text-center">
        <p className="mb-4 font-medium border-b  pb-2">Call Us During Our Ofiice Hours </p>
        <p className="mb-4">Monday – Thursday: 08:00 – 16:00</p>
        <p className="mb-4">Friday: 08:00 - 15:00</p>
        <p className="mb-4">Weekend: Closed</p>
        <p className="mb-4">
          Email:
          <a href="#" className="transition-transform transform hover:scale-110 font-semibold ">ojassoft@gmail.com</a>
        </p>
        <p className="mb-4">
          Phone:
          <a href="#" className="font-semibold ">+91 775758589</a>
        </p>
        <hr className="my-2 h-0 border-t border-r-0 border-b-0 border-l-0 border-gray-300" />
        <p className="mb-4">RERA.no: 63452-2832</p>
        <p className="mb-4">VAT no: 32353</p>
      </div>
    </div>
  </div>
</div>

</div>

</div>
  );
};

export default Home;
