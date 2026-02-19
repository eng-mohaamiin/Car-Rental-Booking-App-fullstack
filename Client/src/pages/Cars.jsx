import React, { useState, useEffect } from "react";
import Title from "../Components/Title";
import CarCard from "../Components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cars = () => {
  const [input, setInput] = useState("");

  // getting seach params from url

  const [searchParams] = useSearchParams();

  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");

  const returnDate = searchParams.get("returnDate");

  const { getCarsDb } = useAppContext();

  const isSearchDate = pickupLocation && pickupDate && returnDate;
  const [filterCars, setFilterCars] = useState([]);

  const applyFilter = async () => {
    if (input === "") {
      setFilterCars(getCarsDb);
      return null;
    }
    const filtered = getCarsDb.filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase())
      );
    });

    setFilterCars(filtered);
  };

  // searchCarAvailablity
  const searchCarAvailablity = async () => {
    const res = await fetch(`/api/bookings/checkAvailability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: pickupLocation,
        pickupDate,
        returnDate,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setFilterCars(data.availableCars);
      if (data.availableCars.length === 0) {
        toast((t) => (
          <span>
            <button onClick={() => toast.dismiss(t.id)}>Car not found</button>
          </span>
        ));
      }
    }
  };
  useEffect(() => {
    if (isSearchDate) {
      searchCarAvailablity();
    }
  }, [pickupLocation, pickupDate, returnDate]);

  useEffect(() => {
    getCarsDb.length > 0 && !isSearchDate && applyFilter();
  }, [input, getCarsDb]);

  return (
    <>
      <div className="flex flex-col items-center py-20 bg-[#f1f5f9] max-md:px-4">
        <Title
          title={"Available Cars"}
          subTitle={
            "Browse our selection of premium vehicles available for your next adventure"
          }
        />

        <div class="flex items-center bg-white px-6 mt-2 max-w-[500px] w-full h-14 rounded-full shadow-md border border-gray-100 transition-shadow hover:shadow-lg">
          {/* <!-- Search Icon --> */}
          <svg
            class="w-5 h-5 text-gray-400 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>

          {/* <!-- Input --> */}
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            class="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
          />

          {/* <!-- Filter Icon --> */}
          <div class="pl-4 border-l border-gray-200 ml-2 cursor-pointer hover:text-blue-500 transition">
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      {/* number of car car list  */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filterCars.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cars;
