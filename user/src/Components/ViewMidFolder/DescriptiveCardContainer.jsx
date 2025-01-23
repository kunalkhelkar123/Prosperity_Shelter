import React from 'react'

function DescriptiveCardContainer(props) {
  
  return (
    <>
    <div className="block mt-5  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-start  text-[#390255] text-2xl font-bold tracking-tight  dark:text-white">{props.title} : {props.titleValue} </h5>
        <p className="text-start font-normal text-gray-700 dark:text-gray-400">{props.titleDesc}</p>

      </div>
    </>
  )
}

export default DescriptiveCardContainer