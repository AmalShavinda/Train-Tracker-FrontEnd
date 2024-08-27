import React, { useState } from "react";
import Trains from "../../components/Admin/Trains";
import SideBar from "../../components/Admin/SideBar";
import Users from "../../components/Admin/Users";
import TrainHistory from "../../components/Admin/TrainHistory";
import TrainRoute from "../../components/Admin/TrainRoute";
import Engine from "../../components/Admin/Engine"

const Admin = () => {
  const [selectedPage, setSelectedPage] = useState("users");

  const renderContent = () => {
    switch (selectedPage) {
      case "users":
        return <Users />;
      case "trains":
        return <Trains />;
      case "trainHistory":
        return <TrainHistory />;
      case "trainRoutes":
        return <TrainRoute />;
      case "engine":
        return <Engine />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="h-[100vh]">
        <SideBar setSelectedPage={setSelectedPage} />
      </div>
      <div className="ml-[260px] flex-1 p-6 bg-gray-100">{renderContent()}</div>
    </div>
  );
};

export default Admin;
