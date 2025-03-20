import React, { useState, useEffect, useLayoutEffect } from 'react';
import Card from './ViewAllCard';
import PaginationButton from '../Investment/PaginationButton';
import { useLocation } from 'react-router-dom';
import Corespace_navbar from '../Corespace_Navigation/Corespace_navbar';
import Corespace_footer from '../Corespace_footer/Corespace_footer';

const ViewAllApp = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [currentOutput, setCurrentOutput] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { state } = useLocation();

  useEffect(() => {
    console.log('state ', state);
    if (state && state.data) {
      setAllProperties(state.data);
    } else {
      console.error('State is not in expected format:', state);
    }
  }, [state]);

  useEffect(() => {
    const updateCurrentOutput = () => {
      if (Array.isArray(allProperties)) {
        const lastPostIndex = currentPage * postPerPage;
        const firstPostIndex = lastPostIndex - postPerPage;
        setCurrentOutput(allProperties.slice(firstPostIndex, lastPostIndex));
      } else {
        console.error('allProperties is not an array:', allProperties);
      }
    };

    updateCurrentOutput();
  }, [currentPage, postPerPage, allProperties]);

  return (

    <>
      <Corespace_navbar />
      <div className="bg-white flex flex-col justify-center items-center">
        <div className="items-center justify-center mt-4">
          <div className="b mt-[3-px] mb-[100px]">
            <h2 className="text-4xl text-center font-bold uppercase">
              <span className="text-black">PROPERTIES FOR </span>
              <span className="text-purple-900">Your Growth</span>
            </h2>
          </div>
        </div>
        <div className="flex flex-row justify-center  items-center gap-6 flex-wrap">
          {currentOutput.map((card) => (
            <div key={card.id}>
              <Card data={card} />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8 mb-8">
          <PaginationButton totalPosts={allProperties.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
      </div>

      <Corespace_footer />
    </>
  );
};

export default ViewAllApp;
