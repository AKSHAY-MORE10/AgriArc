import React, { useState } from "react";
import "../Styleing.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  // axios.defaults.withCredentials= true

  const accountSignINhandler = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/v1/users/login", data)
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data));
        getData(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const getData = (resdata) => {
    const storedData = JSON.parse(localStorage.getItem("user"));
    if (storedData) {
      navigate("/home/weather", { replace: true });
    }
  };

  const redirectTo = () => {
    navigate("/home", { replace: true });
  };

  return (
    <>
      <div className=" w-full h-screen bg-[#8EE4AF]">
        <div className="box overflow-hidden w-[65%] flex h-[70%]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <div className=" bg-[#45b86a]  relative left w-[50%]  h-[100%]">
            <form
              onSubmit={accountSignINhandler}
              className="flex flex-col absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  gap-3"
              action=""
            >
              <h1 className="mx-auto text-3xl mb-2 font-semibold underline">Sign In</h1>

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="username">
                  Username:
                </label>
                <input
                  id="username"
                  name={"username"}
                  className="px-4 text-black w-[110%] outline-none py-2 rounded-xl"
                  type="text"
                  placeholder="Username"
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
              </div>

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="password">
                  Password:
                </label>
                <input
                  id="password"
                  name={"password"}
                  className="px-4 text-black w-[110%] outline-none py-2 rounded-xl"
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>

              <div className="button items-center w-full flex flex-col gap-2  ">
                <button
                  type="submit"
                  className={"py-2 px-5 mt-3 w-fit bg-[#379683] text-white font-semibold rounded-xl"}
                >
                  Sign In
                </button>

              </div>
              <NavLink
                className={
                  "hover:text-white duration-300 ease-in-out font-semibold text-xl mt-3 text-center"
                }
                to={"/signup"}
              >
                Create an Account
              </NavLink>
            </form>
          </div>

          <div className=" rounded_bg right w-[50%] bg-[#45b86a] h-[100%] py-2  ">
            <img
              className="w-full p-3 h--full object-cover  "
              src="/signin1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
