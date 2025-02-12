import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenderTextBox from "../components/GenderTextBox";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const {loading,signup} = useSignup();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    //console.log(inputs);
    signup(inputs)
  };
  return (
    <div className=" mx-auto flex flex-col items-center justify-center min-w-90">
      <div className="w-full p-6 border rounded-lg shadow-md border-slate-300">
        <h1 className="text-white lg:text-3xl lg:font-semibold text-center">
          Sign Up <span className="  text-yellow-400">Buzz</span>
        </h1>
        <form onSubmit={handleSubmitForm}>
          <div className="mt-2">
            <label className="Label p-2">
              <span className="text-base label-text">Full name</span>
            </label>
            <input
              type="text"
              placeholder="john doe"
              className="w-full outline-none bg-gray-300 rounded-md p-2 h-10"
              value={inputs.fullname}
              onChange={(e) =>
                setInputs({ ...inputs, fullname: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <label className="Label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full outline-none bg-gray-300 rounded-md p-2 h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <label className="Label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter password"
              className="w-full outline-none bg-gray-300 rounded-md p-2 h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <label className="Label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full outline-none bg-gray-300 rounded-md p-2 h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderTextBox
            selectedGender={inputs.gender}
            onCheckBoxChange={handleCheckBoxChange}
          />

          <Link
            to={"/login"}
            className="inline-block pt-2 text-sm hover:underline
           text-slate-400 hover:text-blue-300"
          >
            Already have an account?
          </Link>
          <div>
            <button
              className="mt-4  p-2 text-white w-full
             bg-red-700 rounded-md outline-none text-sm hover:bg-red-900 transition-all"
             disabled={loading}
        
            >
              {loading ? "Loading...":"Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
// dekh sakti kash, apna husn meri ankh se
// tune sab paya hae ashiq ki nazar payi nahi
// jabse dekha tujkho, dunia ki taraf chahi nahi
// jabse chaha tujkho apni yaad bhi ahi nahi
// tujko pana jindegi hae, tujko khona maut hai
// aur kuch iske siwa  mere fasane  me nahi
// mang lunga me khuda se, ya chura lunga tujhe
// tujka moti doosra uske khazane me nahi
// tere dil par haq mera hae ya nahi
// dil dhadakne bhi laga hae ya nahi
// pyar dhadkhan pe chupa hae iya nahi
