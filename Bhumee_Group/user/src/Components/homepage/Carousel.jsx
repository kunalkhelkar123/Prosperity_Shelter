import React, { useState, useEffect } from 'react'


const Carousel = ({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) => {
    const [curr, setCurr] = useState(0)

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])


    return (
        <div className='overflow-hidden relative w-[311px] items-center   '>
            <div className='flex  transition-transform ease-out duration-500' style={{ transform: `translateX(-${curr * 100}%)` }}>
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center  justify-between  w-[300px]">
                {/* <button onClick={prev} className='p-1 rounded-full shadow ml-5 bg-gray-100 text-gray-800 '>
                <span>{'<'}</span>
                </button> */}
                {/* <button onClick={next} className='p-1 rounded-full shadow mr-2 bg-gray-100 text-gray-800 '>
                <span>{'>'}</span>
                </button> */}
            </div>
            <div className='absolute bottom-5 ml-[130px]  w-fit  bg-gray-400  rounded-full opacity-30 '>
                <div className='flex items-center justify-center gap-5 h-3 '>
                    {slides.map((s, i) => (
                        <div key={i} className={`transition-all w-auto h-auto bg-white rounded-full  ${curr === i ? "p-0.5" : "bg-opacity-50"}`} />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Carousel