import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmiteForm = async (e) => {
    e.preventDefault();
    console.log(inputs);
    login(inputs.username, inputs.password);
  };

  return (
    <div className=" mx-auto flex flex-col items-center justify-center min-w-90">
      <div className="w-full p-6 border rounded-lg shadow-md border-slate-300">
        <h1 className="text-white lg:text-3xl lg:font-semibold text-center">
          Login <span className="  text-yellow-400">Buzz</span>
        </h1>
        <form onSubmit={handleSubmiteForm}>
          <div className="mt-2">
            <label className="Label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full outline-none text-black bg-gray-300 rounded-md p-2 h-10"
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
              type="password"
              placeholder="Enter Password"
              className="w-full outline-none text-black bg-gray-300 rounded-md p-2 h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          {/* <GenderTextbox/> */}

          <Link
            to={"/signup"}
            className="inline-block pt-2 text-sm hover:underline text-slate-400 hover:text-blue-300"
          >
            Dont have an account?
          </Link>
          <div>
            <button
              className="mt-4  p-2 text-white w-full
                bg-red-700 rounded-md outline-none text-sm hover:bg-red-900 transition-all"
              disabled={loading}
            >
              {loading ? "Loading" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
