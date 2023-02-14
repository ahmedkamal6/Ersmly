import React from "react";
import { FormField } from "../Components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changePassword, loginUser } from "../Redux/loginSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const handleSubmit = () => {
    const user = { name: login.name, password: login.password };
    dispatch(loginUser(user))
      .unwrap()
      .then(() => {
        alert("Your account has been successfully signed in");
        navigate("/");
      })
      .catch(() => {
        throw new Response("server error", {
          status: 500,
          statusText: "there has been an error with the server",
        });
      });
  };
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center font-bold">Log in</h1>
          <FormField
            type="text"
            name="name"
            placeholder="Name"
            value={login.name}
            handleChange={(e) => dispatch(changeName(e.target.value))}
          />

          <FormField
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            handleChange={(e) => dispatch(changePassword(e.target.value))}
          />
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-[#6469ff] text-white hover:bg-green-dark focus:outline-none my-1"
            onClick={handleSubmit}
          >
            Log In
          </button>
          <div className="text-grey-dark mt-6">
            Don't have an account? &nbsp;
            <span
              className="no-underline border-b border-blue text-[#6469ff] cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
