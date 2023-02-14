import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./Pages/index";
import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
const App = () => {
  const login = useSelector((state) => state.login);

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items.center pg-white sm:px-8 px-4 pt-4 border-b border-b-[#e6ebf4] ">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <div className="flex gap-10">
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md h-10"
          >
            Create
          </Link>
          {JSON.parse(localStorage.getItem("loggedUserName")) ? (
            <button
              className="font-inter font-medium text-black px-4 py-2 rounded-md h-10"
              onClick={()=> {localStorage.clear(); location.reload()}}
            >
              {JSON.parse(localStorage.getItem("loggedUserName"))}
            </button>
          ) : (
            <Link
              to="/login"
              className="font-inter font-medium text-black px-4 py-2 rounded-md h-10"
            >
              Login
            </Link>
          )}
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
