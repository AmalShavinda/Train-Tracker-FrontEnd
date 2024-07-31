import React from "react";
import { navLinks } from "../constants";
import { SiTrainerroad } from "react-icons/si";
import { BsFillTrainFreightFrontFill } from "react-icons/bs";

const NavBar = () => {
  return (
    <header>
      <nav className=" flex justify-between w-full px-10 py-4 fixed items-center z-10">
        <a href="" className="text-white flex items-center gap-2 text-lg uppercase font-bold">
          <SiTrainerroad size={30} color='white'/>
          <BsFillTrainFreightFrontFill size={20} color="white" className="ml-[-6px]"/>
          tracker
        </a>
        <ul className="flex-1 flex justify-center items-center gap-16">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-base text-white uppercase"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6">
          <button className="px-10 py-2 bg-blue-500 text-white text-sm font-semibold uppercase">Sign In</button>
          <button className="text-white font-semibold uppercase text-sm px-10 py-2 border border-blue-500">Sign Up</button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
