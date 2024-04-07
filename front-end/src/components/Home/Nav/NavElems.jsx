import React from "react";
import { NavLink } from "react-router-dom";

function NavElems() {
  return (
    <>
      <div className="NavElem w-full mt-3 items-center justify-center flex flex-col gap-3">
        <NavLink
          style={(e) => {
            return{
              backgroundColor: e.isActive ? "#654821d8" : "#a48762e0",
            }
          }}
          to={"/home/weather"}
          className="text-2xl bg-[#a48762e0] w-[200px] text-white rounded-full py-2 text-center tracking-wide"
        >
          Weather
        </NavLink>
        <NavLink style={(e) => {
            return{
              backgroundColor: e.isActive ? "#654821d8" : "#a48762e0",
            }
          }}
          to={"/home/plantDetector"}
          className="text-2xl  bg-[#654821d8] text-white rounded-full w-[200px] py-2 text-center "
        >
          Plant Detector
        </NavLink>
        
        <NavLink style={(e) => {
            return{
              backgroundColor: e.isActive ? "#654821d8" : "#a48762e0",
            }
          }}
          to={"/home/plantDetails"}
          className="text-2xl  bg-[#64c290] text-white rounded-full w-[200px] py-2 text-center tracking-wide"
        >
          Plant Guidance
        </NavLink>
      </div>
    </>
  );
}

export default NavElems;
