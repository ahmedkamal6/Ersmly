import React from "react";
import { FormField } from "../Components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeEmail,
  changeName,
  changePassword,
  registerNew,
  changeConfirmPassword,
} from "../Redux/registerSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reg = useSelector((state) => state.register);
  const handleSubmit = () => {
    const user = {
      name: reg.fullName,
      email: reg.email,
      password: reg.password,
    };
    dispatch(registerNew(user)).unwrap()
    .then(() => {
      alert("Your account has been successfully registered");
      navigate("/login");
    })
    .catch(() => {
      throw new Response("server error", {
        status: 500,
        statusText: "there has been an error with the server",
      });
    });;
  };
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center font-bold">Register</h1>
          <FormField
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={reg.name}
            handleChange={(e) => dispatch(changeName(e.target.value))}
          />
          <FormField
            type="email"
            name="email"
            placeholder="Email"
            value={reg.email}
            handleChange={(e) => dispatch(changeEmail(e.target.value))}
          />
          <FormField
            type="password"
            name="password"
            placeholder="Password"
            value={reg.password}
            handleChange={(e) => dispatch(changePassword(e.target.value))}
          />
          <FormField
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={reg.confirmPassword}
            handleChange={(e) =>
              dispatch(changeConfirmPassword(e.target.value))
            }
          />
          <small
            style={reg.noMatch ? { display: "initial" } : { display: "none" }}
          >
            password doesn't match
          </small>
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-[#6469ff] text-white hover:bg-green-dark focus:outline-none my-1 disabled:opacity-25"
            onClick={handleSubmit}
            disabled = {reg.noMatch}
          >
            Create Account
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account? &nbsp;
          <span
            className="no-underline border-b border-blue text-[#6469ff] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
          .
        </div>
      </div>
    </div>
  );
};

export default Register;
