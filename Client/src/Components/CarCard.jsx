import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {



  const navigate = useNavigate()


  return (
    <div className="bg-white rounded-lg pb-4  shadow-sm hover:shadow-md transition max-w-xl">
      
      {/* Image */}
      <div className="relative">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover mb-4 rounded-tl-lg rounded-tr-lg
"
        />

        {car.isAvaliable ? (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
            Available Now
          </span>
        ):

          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
            unAvailable
          </span>


      
      }
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-500">
          {car.category} • {car.year}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <img src={assets.users_icon} className="h-4" />
            {car.seating_capacity} People
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.fuel_icon} className="h-4" />
            {car.fuel_type}
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.car_icon} className="h-4" />
            {car.transmission}
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.location_icon} className="h-4" />
            {car.location}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t border-gray-100 pt-4 px-4">
        <div>
          <span className="text-xl font-bold text-gray-900">
            ${car.pricePerDay}
          </span>
          <span className="text-sm text-gray-500"> / day</span>
        </div>

        <button

        onClick={()=> {
          navigate(`/car-details/${car._id}`);
          window.scrollTo(0, 0);
        }}
         
        
        className="px-5 py-2 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-800">
          See more
        </button>
      </div>
    </div>
  );
};

export default CarCard;
