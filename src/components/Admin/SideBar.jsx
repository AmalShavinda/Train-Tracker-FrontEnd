import React from "react";

const SideBar = ({setSelectedPage}) => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-xl font-bold">Admin Dashboard</div>
      <button
        onClick={() => setSelectedPage("users")}
        className="p-4 text-left hover:bg-gray-700 focus:outline-none"
      >
        Users
      </button>
      <button
        onClick={() => setSelectedPage("trains")}
        className="p-4 text-left hover:bg-gray-700 focus:outline-none"
      >
        Trains
      </button>
    </div>
  );
};

export default SideBar;
