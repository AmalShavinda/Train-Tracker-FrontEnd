import React, { useEffect, useState } from "react";
import Train1 from "../assets/train1.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Trains = () => {
  const [trains, setTrains] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = (trainId) => {
    navigate(`/track-trains/${trainId}`);
  };

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/train/get-trains"
        );
        setTrains(res.data);
      } catch (error) {
        console.error("Error fetching train data: ", error);
      }
    };
    fetchTrains();
  }, []);

  return (
    <div className="px-10">
      <h1 className="flex justify-center text-2xl text-[#323232] font-semibold uppercase my-4">
        Available Trains
      </h1>
      <div className="flex flex-wrap gap-4">
        {trains.map((train, index) => (
          <div
            key={index}
            className="bg-slate-100 border border-slate-200 rounded-md w-fit p-4"
          >
            <img src={Train1} alt="train 1" className="w-60" />
            <div className="flex flex-col mt-3">
              <p className="text-sm text-[#323232] font-semibold">
                {train.trainName}
              </p>
              <p className="text-xs text-[#323232] font-medium mt-1">
                {train.routeName}
              </p>
              <button
                className="flex justify-center bg-blue-500 rounded-sm text-white px-6 py-2 mt-3"
                onClick={() => handleNavigate(train._id)}
              >
                See Live Location
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trains;
