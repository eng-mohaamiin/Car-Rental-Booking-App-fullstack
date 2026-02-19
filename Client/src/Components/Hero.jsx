import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Hero = () => {
  const navigate = useNavigate();
  const [pickDateType, setPickDateType] = useState("text");
  const [returnDateType, setReturnDateType] = useState("text");
  const [pickUpLocation, setPickUpLocaton] = useState("");
  const { pickupDate, setPickupDate, setReturnDate, returnDate } =
    useAppContext();

  const handleSearch = async (e) => {
    
    e.preventDefault();

    if(!pickUpLocation){
      toast.error("Select pickup Location")
      return 
    }
    if(!pickupDate){
      toast.error("Select pickup Date")
      return 
    }
    if(!returnDate){
      toast.error("Select return Date")
      return 
    }

    navigate(
      // "/cars?pickUpLocation=" +
      //   pickUpLocation +
      //   "&pickupDate" +
      //   pickupDate +
      //   "returnDate" +
      //   returnDate,
      `/cars?pickupLocation=${pickUpLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`

    );
  };

  return (
    <div>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 lg:pt-20 pb-32 items-center">
          {/* Left Text */}
          <div className="z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 mb-6">
              Buy, sell & rent <br />
              <span className="text-red-500">reputable cars</span>
            </h1>
            <p className="text-gray-500 text-lg mb-10 max-w-md leading-relaxed">
              Buy and sell reputable cars. Renting a car is easy and fast with
              Topcar
            </p>

            <div className="flex items-center space-x-12">
              <div>
                <span className="block text-3xl font-bold text-gray-900">
                  50+
                </span>
                <span className="text-gray-500 text-sm">Car brands</span>
              </div>
              <div className="h-10 w-px bg-gray-300"></div>
              <div>
                <span className="block text-3xl font-bold text-gray-900">
                  10k+
                </span>
                <span className="text-gray-500 text-sm">Clients</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-10 lg:translate-x-10">
            <img
              src={assets.banner_car_image}
              alt="Red Sports Car"
              className="w-full object-contain drop-shadow-2xl transform scale-110"
            />
          </div>
        </div>

        {/* Floating Search Widget */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 lg:translate-y-1/4 px-4 sm:px-6 z-30">
          <form
            onSubmit={ handleSearch}
            className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-2 sm:p-4"
          >
            {/* Input Group */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 p-2 rounded-2xl">
              {/* Pick-up Location */}
              <div className="flex items-center px-4 py-3 bg-white rounded-xl shadow-sm w-full md:w-1/3 border border-transparent focus-within:border-gray-200 transition">
                <svg
                  className="w-5 h-5 text-gray-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <select
                 onChange={(e) => setPickUpLocaton(e.target.value)}
                  value={pickUpLocation}
                  
                  className="w-full outline-none text-gray-700 bg-transparent text-sm cursor-pointer"
                >
                  <option value="" disabled selected>
                    Pick-up Location
                  </option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Houston">Houston</option>
                  <option value="Chicago">Chicago</option>
                </select>
              </div>

              {/* Pick-up Date */}
              <div className="flex items-center px-4 py-3 bg-white rounded-xl shadow-sm w-full md:w-1/3 border border-transparent focus-within:border-gray-200 transition">
                <svg
                  className="w-5 h-5 text-gray-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <input
                onChange={(e) => setPickupDate(e.target.value)}
                  value={pickupDate}
                  type={pickDateType}
                  onFocus={() => setPickDateType("date")}
                  onBlur={() => setPickDateType("text")}
                  placeholder="Pick-up Date"
                  className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                  min={new Date().toISOString().split("T")[0]}
                  id="pickup-date"
                />
              </div>

              {/* Return Date */}
              <div className="flex items-center px-4 py-3 bg-white rounded-xl shadow-sm w-full md:w-1/3 border border-transparent focus-within:border-gray-200 transition">
                <svg
                  className="w-5 h-5 text-gray-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <input
                onChange={(e) => setReturnDate(e.target.value)}
                  value={returnDate}
                  type={returnDateType}
                  onFocus={() => setReturnDateType("date")}
                  onBlur={() => setReturnDateType("text")}
                  placeholder="Return Date"
                  className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                  id="return-date"
                />
              </div>

              {/* Search Button */}
              <button className="w-full md:w-auto px-8 py-3 bg-red-500 text-white font-medium rounded-xl shadow-lg hover:bg-red-600 transition shadow-red-500/30">
                Search
              </button>
            </div>
            <p className="text-gray-500 hover:text-gray-900 transition text-[13px] ml-14">
              {pickUpLocation ? pickUpLocation : "please select location"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
