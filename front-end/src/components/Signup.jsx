import React, { useState } from "react";
import "../Styleing.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  let [data, setData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const navigate = useNavigate();

  const accountCreatehandler = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post("/api/v1/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        console.log(res);
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <div className=" w-full h-screen bg-[#8EE4AF]">
        <div className="box  overflow-hidden w-[65%] flex h-[75%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <div className="  rounded_bg flex justify-center items-center left w-[50%]  h-[100%]">
            <img
              className="w-full p-5  object-cover  "
              src="/signup1.png"
              alt=""
            />
          </div>

          <div className="right justify-center flex items-center w-[50%] bg-[#45b86a] h-[100%] py-2  ">
            <form
              onSubmit={accountCreatehandler}
              className="flex flex-col p-4 w-full gap-2"
              action=""
            >
              <h1 className="mx-auto text-3xl mt-2 underline font-semibold">Create Account</h1>

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="fullName">
                  Full Name:
                </label>
                <input
                  id="fullName"
                  name={"fullName"}
                  className="px-4  text-black outline-none py-2 rounded-xl"
                  type="text"
                  placeholder="FullName"
                  required
                  onChange={(e) =>
                    setData({ ...data, fullName: e.target.value })
                  }
                />
              </div>

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="username">
                  Username:
                </label>
                <input
                  id="username"
                  name={"username"}
                  className="px-4   text-black outline-none py-2 rounded-xl"
                  type="text"
                  placeholder="Username"
                  min={7}
                  required
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
              </div>

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="email">
                  Email:
                </label>
                <input
                  id="email"
                  name={"email"}
                  className="px-4  py-2  text-black outline-none rounded-xl"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="password">
                  Password:
                </label>
                <input
                  id="password"
                  name={"password"}
                  className="px-4   text-black outline-none py-2 rounded-xl"
                  type="password"
                  required
                  min={6}
                  placeholder="Password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>

              <div className="elem mt-4 flex gap-2">
                <label className="text-xl ml-2" htmlFor="profileimage">
                  Profile Image:
                </label>

                <p className="px-4  w-fit text-center   py-1  rounded-2xl">
                  <label htmlFor="profileimage" className="px-4 py-2 bg-[#379683ad] text-white rounded-xl">Select Photo</label>
                </p>
                <input
                  id="profileimage"
                  name={"profileimage"}
                  className="px-4 hidden "
                  type="file"
                  placeholder="ProfileImage"
                  onChange={(e) =>
                    setData({ ...data, profileImage: e.target.files[0] })
                  }
                />
              </div>

              <div className="button mt-4 w-full flex justify-center">
                <button
                  type="submit"
                  className={"p-3 px-4 rounded-xl text-white font-semibold bg-[#379683]"}
                >
                  Create Account
                </button>
              </div>

              <p className="p-1 font-semibold text-center">
                Already Have an account{" "}
                <NavLink className={"hover:text-white duration-300"} to={"/signin"}>
                  LogIn
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
