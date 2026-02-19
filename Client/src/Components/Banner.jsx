import React from "react";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div
      className="flex flex-col md:flex-row md:items-start items-center justify-between px-8
    
    min-md:pl-14 pt-10 bg-gradient-to-r from-[#fe059f] to-[#ffa9ec] max-w-6xl mx-3 md:mx-auto  rounded-2xl overflow-hidden
    "
    >
      <div className="text-white">
        <h2 className="tex-3xl font-medium">Do You Own a Luxury Car?</h2>
        <p className="mt-2">Monetize your vehicle effortlessly by listing it on CarRental.</p>
        <p className=" max-w-[530px]">
          We take care of insurance, driver verification and secure payments —
          so you can earn passive income, stress-free.
        </p>
        <button className="px-6 mt-3 text-sm py-2 bg-white rounded-lg hover:bg-slate-100 transition-all text-black">List your car</button>
      </div>

      <img className=" max-h-44 mt-10" src={assets.banner_car_image} alt="car" />
    </div>
  );
};

export default Banner;
