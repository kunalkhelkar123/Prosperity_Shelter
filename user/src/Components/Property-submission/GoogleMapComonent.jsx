import React from 'react';

function GoogleMapComonent() {
  return (
    <div>
        <label className="block  mt-5 my-5 text-lg font-medium text-gray-900 dark:text-black">
                  Regions
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Atlanta</option>
                  <option value="US">Florida</option>
                  <option value="CA">Los Angeles</option>
                  <option value="FR">Miami</option>
                  <option value="FR">New York</option>
                  <option value="DE">Orlando</option>
                </select>
                <label className="block my-5 text-lg font-medium text-gray-900 dark:text-black" for="large_size">Friendly Address</label>
<input
  className="placeholder:italic    bg-white w-full border border-gray-400 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
  placeholder=""
  type="text"
  name="PropertyId"
/>
<label className="block mb-5 text-lg font-medium text-gray-900 dark:text-black" for="large_size">Map Location</label>
<input
  className="placeholder:italic  h-[90px]  bg-white w-full border border-gray-500 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
  placeholder=""
  type="text"
  name="PropertyId"
/>

                
    </div>
  );
}

export default GoogleMapComonent;
