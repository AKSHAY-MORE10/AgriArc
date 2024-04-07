import { NavLink } from "react-router-dom";
import './Landingpage.css'
function Landingpage() {
  return (
    <>
      <div className="main h-full p-2 px-4 w-full bg-[#8EE4AF]">
        <div className=" w-full flex justify-start items-center gap-5 p-2 ">
          <NavLink
            className="px-4 py-2 bg-[#379683] text-white font-semibold rounded-xl"
            to={"/signup"}
          >
            SignUp{" "}
          </NavLink>
          <NavLink
            className="px-4 py-2 bg-[#379683] text-white font-semibold rounded-xl"
            to={"/signin"}
          >
            SignIn{" "}
          </NavLink>
        </div>

        <div className="flex ">
          <div className="w-[55%] h-[80vh] flex items-center justify-center ">
            <div className="flex flex-col items-center">
            <h1 className="text-8xl text-center fontgilroy">Welcome To,</h1>
              <h1 className="text-8xl  text-center  fontgilroy">AgroArc</h1>
              <h3 className="capitalize text-2xl text-center mt-3 text-slate-600">.sow .grow .thrive</h3>
            <button className="mt-10 px-4 py-2 bg-[#379683] w-[30%] font-5xl text-white font-semibold rounded-xl"><NavLink
            className="px-4 py-2 bg-[#379683] text-white font-semibold rounded-xl"
            to={"/signup"}
          >
            Get Started{" "}
          </NavLink></button>
            </div>
          </div>
        <iframe
          className="absolute  top-[8%] bottom-[0%] right-8 "
          src="https://my.spline.design/untitled-549406a934ddba187e22c14e8d85202c/"
          frameborder="0"
          width="40%"
          height="800px"
        ></iframe>
        </div>
        
      </div>
    </>
  );
}

export default Landingpage;
