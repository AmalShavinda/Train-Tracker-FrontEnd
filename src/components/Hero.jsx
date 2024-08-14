import React from "react";
import HeromImg from "../assets/train_hero.png";
import '../custom.css'

const Hero = () => {
  return (
    <section id="home" className="w-full relative">
      <div className="mask">
        <img
          src={HeromImg}
          alt="hero_image"
          className="w-full h-[100vh] object-cover bg-cover bg-center overflow-hidden"
        />
      </div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
        <h1 className="text-white text-5xl font-bold mb-3">Connecting You Across Sri Lanka</h1>
        <p className="text-white text-base font-medium">Explore the beauty of Sri Lanka with real-time train tracking and detailed route information.</p>
        <button className="bg-blue-500 px-10 py-2 start-0 text-white text-sm font-semibold uppercase mt-10">Track Live Location</button>
      </div>
    </section>
  );
};

export default Hero;
