import React from 'react';

function Media({ formData, setFormData }) {
  return (
    <div className='p-5'>
      <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-black" htmlFor="small_size">Featured Image</label>
      <input className="b h-[50px] " id="small_size" type="file" name='featureImage'
      // value={formData.featureImage}
       onChange={(e)=>setFormData({...formData,featureImage:e.target.files})} />

      <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-black" htmlFor="default_size">Gallery</label>
      <input className=" h-[50px]" id="default_size" type="file" name='gallary'
      value={formData.gallery} 
      onChange={(e)=>setFormData({...formData,gallery:e.target.value})} />

      <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-black" htmlFor="large_size">Attachments</label>
      <input className=" " id="large_size" type="file"  accept=".pdf" name="attachments"
        value={formData.attachments}
        onChange={(e) => setFormData({ ...formData, attachments: e.target.value })} />

      <label className="block mb-2 text-lg font-medium mt-5 text-gray-900 dark:text-black" htmlFor="large_size">Video Link</label>
      <input
        className="placeholder:italic    bg-white w-full border border-black rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
        placeholder=""
        type="text"
        name="videoLink"
        value={formData.videoLink}
        onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
      />
      <p className='text-xs text-gray-500 p-2'>Enter Youtube or Vimeo url.</p>

      {/* <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-black" htmlFor="large_size">Attachments</label>
      <textarea
        className="placeholder:italic  h-[90px]  bg-white w-full border border-black rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
        placeholder=""
        name="attachments"
        value={formData.attachments}
        onChange={(e) => setFormData({ ...formData, attachments: e.target.value })}
      /> */}
      {/* <p className='text-xs text-gray-500 p-2'>Input iframe to show 360° Virtual Tour.</p> */}
    </div>
  );
}

export default Media;