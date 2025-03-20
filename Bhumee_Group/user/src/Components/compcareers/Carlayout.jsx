import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Carlayout() {
  return (
    <>

    <div >
        
    </div>
      <div className=" sm:flex gap-4  lg:px-20  ">
        <div className=" grid grid-cols-2 sm:grid-cols-1 align-middle gap-3 sm:ml-3 ">


          <Link to="/" 
          activeClassName="true"
          smooth={true} 
          spy={true} >
           
            <div className="flex justify-center gap-4 hover:bg-yellow-400 p-2">
              <div>
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="font-semibold hover:font-bold">Sales Executive</div>
            </div>
            
          </Link>

          <Link to="Carpresalesexe">
           
            <div className="flex justify-center gap-4 hover:bg-yellow-400 p-2">
              <div> <span className="material-symbols-outlined">person</span></div>
              <div className="font-semibold hover:font-bold">Presales Executive</div>
            </div>
          </Link>


          <Link to="/Carsalesmanager">
           
            <div className="flex justify-center gap-4 hover:bg-yellow-400 p-2">
              <div> <span className="material-symbols-outlined">person</span></div>
              <div className="font-semibold hover:font-bold">Sales Manager</div>
            </div>
          </Link>


          <Link to="/Carleadgenerate">
           
            <div className="flex justify-center gap-4 hover:bg-yellow-400 p-2">
              <div> <span className="material-symbols-outlined">person</span></div>
              <div className="font-semibold hover:font-bold">Lead generation</div>
            </div>
          </Link>
        </div>



        <div className="h-96 w-84 overflow-y-scroll mt-8 sm:mt-0 border-t-2 border-b-2 p-4 sm:w-[95%] sm:border-l-2 sm:border-t-0 sm:border-r-4 sm:p-8 sm:mr-4">
         
          <Outlet />{" "}
        </div>
      </div>
    </>
  );
}

export default Carlayout;
