import React, { useContext } from "react";
import { navLinks } from "../constants";
import { SiTrainerroad } from "react-icons/si";
import { BsFillTrainFreightFrontFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <header>
      <nav className=" flex justify-between w-full px-10 py-4 items-center bg-black z-10">
        <div
          className="text-white flex items-center gap-2 text-lg uppercase font-bold cursor-pointer"
          onClick={() => handleNavigate("/")}
        >
          <SiTrainerroad size={30} color="white" />
          <BsFillTrainFreightFrontFill
            size={20}
            color="white"
            className="ml-[-6px]"
          />
          tracker
        </div>
        <ul className="flex-1 flex justify-center items-center gap-16">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="leading-normal text-base text-white uppercase"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6">
          {user ?
          (
            <>
           <p className="text-base text-white leading-normal uppercase">{user.firstname}</p>
           <FaUserCircle color="white" size={22}/>
           </>
          ) : (
            <>
          <button
            className="px-10 py-2 bg-blue-500 text-white text-sm font-semibold uppercase"
            onClick={() => handleNavigate("/login")}
          >
            Sign In
          </button>
          <button
            className="text-white font-semibold uppercase text-sm px-10 py-2 border border-blue-500"
            onClick={() => handleNavigate("/signup")}
          >
            Sign Up
          </button>
          </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
