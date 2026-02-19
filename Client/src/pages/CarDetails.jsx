import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const { getCarsDb, currentUser, pickupDate, setPickupDate, setReturnDate, returnDate } =
    useAppContext();
  const currencty = import.meta.env.VITE_CURRENCY;

  useEffect(() => {
    const selectedCar = getCarsDb.find((car) => car._id === id);
    setCar(selectedCar);
  }, [getCarsDb, id]);

  if (!car) return;

  const handleSubimt = async (e) => {
    e.preventDefault();

    



    if (returnDate <= pickupDate) {
    toast.error("Return date must be after pickup date");
    return;
  }

    
    try {
      const res = await fetch(`/api/bookings/createBooking`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          car: id,
          pickupDate,
          returnDate
        })
      })

      const data = await res.json()
      

     
      
      
      if(data.success){
        toast.success(data.message)
      }
      else{
        toast.error("you have to Login")
        return
      }

      navigate("/my-bookings")

    } catch (error) {
      toast.error(error.message)
    }


  };











  return getCarsDb ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          {/* Car Image */}
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto md:max-h-[320px] object-cover rounded-xl mb-6 shadow-md"
          />

          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} • {car.year}
              </p>
            </div>

            <hr />

            {/* Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-slate-200 p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  <p className="text-sm font-medium">{text}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-medium mb-3">Description</h2>
              <p className="text-gray-500 leading-relaxed">{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-medium mb-3">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Mirror",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-600">
                    <img src={assets.check_icon} alt="" className="h-4 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – Booking (placeholder) */}
        <form
          onSubmit={handleSubimt}
          className="shadow-lg h-max sticky top-16 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex items-center justify-between text-gray-800 font-semibold text-2xl">
            {currencty} {car.pricePerDay}{" "}
            <span className=" text-base text-gray-400 font-normal">
              {" "}
              Per day
            </span>{" "}
          </p>

          <hr className=" border-b-gray-600" />

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-data">Pickup Date</label>
            <input
            onChange={(e)=> setPickupDate(e.target.value)}
            value={pickupDate}
              className="border border-gray-300 px-3 py-2 rounded-lg"
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-data">Return Date</label>
            <input
            onChange={(e)=> setReturnDate(e.target.value)}
            value={returnDate}
              className="border border-gray-300 px-3 py-2 rounded-lg"
              type="date"
              id="return-date"
            />
          </div>
          <button class="w-full py-4 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:from-[#0558fe] hover:bg-red-600 transition-all ">
            Book Now
          </button>

          <p class="text-center text-xs text-gray-400">
            No credit card required to reserve
          </p>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
