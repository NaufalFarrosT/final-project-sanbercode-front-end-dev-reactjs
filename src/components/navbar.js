"use client";

import { Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export default function DefaultNavbar() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const profile = () => {
    navigate("/dashboard/profile", { replace: true });
  };

  return (
    <div className="bg-black">
      <Navbar
        fluid
        rounded
        className="w-3/4 mflex flex-wrap justify-around items-center mx-auto bg-black"
      >
        <Navbar.Brand href="https://flowbite-react.com" className="text-white">
          <img
            src="https://pbs.twimg.com/media/Feb1fikVQAI9pcU.jpg:large"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Job Vacancy
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {token === null ? (<Navbar.Link href="#" className="text-lg text-gray-200">
            <Link to="/">Home</Link>
          </Navbar.Link>) : ""}

          {token === null ? (
            <Navbar.Link href="#" className="text-lg text-gray-200">
              <Link to="/login">Login</Link>
            </Navbar.Link>
          ) : (
            <Navbar.Link
              href="#"
              className="text-lg text-gray-200"
              onClick={logout}
            >
              Logout
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
