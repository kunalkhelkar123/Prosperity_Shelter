import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Carlayout from "./Carlayout";
import Carsalesexec from "./Carsalesexec";
import Carleadgenerate from "./Carleadgenerate";
import Carsalesmanager from "./Carsalesmanager";
import Carpresalesexe from "./Carpresalesexe";


function Carjobopening(){

   
const router = createBrowserRouter([
    {
    path:'/',
    element: <Carlayout />,
    children: [
      { index: true, element: <Carsalesexec />}, 
      { path:'/Carleadgenerate', element: <Carleadgenerate />},
      { path:'/Carsalesmanager', element: <Carsalesmanager />},
      { path:'/Carpresalesexe', element: <Carpresalesexe />},
  ],
   },
  
  ]);


    return(
        <>
        <RouterProvider router={router} />
        </>
    )
}

export default Carjobopening;