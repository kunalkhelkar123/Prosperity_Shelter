import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

function Aboutmoto() {
  const cards = [
    { id: 1, symbol: "W", description: "Go to this step by step guideline process on how to certify for your weekly benefits:" },
    { id: 2, symbol: "E", description: "Go to this step by step guideline process on how to certify for your weekly benefits:" },
    { id: 3, symbol: "R", description: "Go to this step by step guideline process on how to certify for your weekly benefits:" },
    { id: 4, symbol: "I", description: "Go to this step by step guideline process on how to certify for your weekly benefits:" },
    { id: 5, symbol: "S", description: "Go to this step by step guideline process on how to certify for your weekly benefits:" },
    { id: 6, symbol: "E", description: "Go to this step by step guideline process on how to certify for your weekly benefits:" }
  ];

  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: { delay: i * 1 },
    }));
  }, [controls]);

  return (
    <>
      {/*  this div for moto.........................................*/}
      <div className="mt-12">
        <div className="bg-blue-10">
          <div className="flex justify-center md:text-4xl md:mt-5 sm:text-3xl sm:mt-1 font-semibold text-purple-900 ">
            Our Values : We- <span className="sm:text-5xl sm:pb-1">RISE</span>
          </div>

          <div className="flex justify-center text-xs sm:text-lg">
            A common code that helps us move forward.
          </div>

          <div className="lg:flex lg:justify-center ">
            <div className="grid grid-cols-2 justify-center lg:grid-cols-6">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0 }}
                  animate={controls}
                  custom={index}
                  className="max-w-sm p-4 m-4 transition-opacity duration-500"
                >
                  <div className="flex justify-center sm:h-36 items-center">
                    <span className="material-symbols-outlined rounded-full bg-yellow-300 p-3 m-2 sm:p-5 sm:flex sm:justify-center sm:items-center sm:h-24 sm:w-24">
                      real_estate_agent
                    </span>
                  </div>
                  <div className="flex justify-center text-purple-900 text-3xl font-bold py-4">{card.symbol}</div>
                  <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*   this div is for feedback..............................<div></div> */}
    </>
  );
}
 export default Aboutmoto;