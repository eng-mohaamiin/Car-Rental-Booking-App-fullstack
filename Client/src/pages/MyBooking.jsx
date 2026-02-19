import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../Components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBooking = () => {
  const [booking, setBooking] = useState([]);

  const currency = import.meta.env.VITE_CURRENCY;
  const { currentUser } = useAppContext();

  const fetchMyBooking = async () => {
    try {
      const res = await fetch(`/api/bookings/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application",
        },
      });

      const data = await res.json();

      if (data.success) {
        setBooking(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    currentUser && fetchMyBooking();
  }, [currency]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
      <Title
        title={"My Booking"}
        subTitle={"View and manage your all car bookings"}
        align={"left"}
      />

      <div>
        {booking.map((booking, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-6  p-6 border border-gray-300 rounded-lg mt-5 first:mt-12"
          >
            {/* car image info  */}

            <div className="md:col-span-1">
              <div className=" rounded-md overflow-hidden mb-3">
                <img
                  src={booking.car.image}
                  alt=""
                  className=" w-full h-auto aspect-video object-cover"
                />
              </div>
              <p className=" text-lg font-medium mt-2">
                {booking.car.brand} {booking.car.model}
              </p>
              <p className=" text-gray-500">
                {booking.car.year} • {booking.car.category} •{" "}
                {booking.car.location}
              </p>
            </div>

            {/* booking info  */}

            <div className=" md:col-span-2">
              <div className="flex items-center gap-2">
                {/* <p className="px-3 py-1.5 bg-slate-200">Booking# {index+1}</p> */}
                <p
                  className={`px-3 py-1 text-xs rounded-full
                     ${
                       booking.status === "Confirmed"
                         ? "bg-green-100 text-green-700"
                         : booking.status === "Cancelled"
                           ? "bg-yellow-100 text-yellow-700"
                           : booking.status === "Pending"
                             ? "bg-red-100 text-red-700"
                             : "bg-gray-100 text-gray-700"
                     }`}
                >
                  {booking.status}
                </p>
              </div>

              <div className="flex items-start gap-2 mt-3">
                <img
                  className="w-4 h-4 mt-1"
                  src={assets.calendar_icon_colored}
                  alt=""
                />
                <div>
                  <p>Rental Period</p>
                  <p>
                    {booking.pickupDate.split("T")[0]} To{" "}
                    {booking.returnDate.split("T")[0]}{" "}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 mt-3">
                <img
                  className="w-4 h-4 mt-1"
                  src={assets.location_icon_colored}
                  alt=""
                />
                <div>
                  <p>Pickup Location</p>
                  <p>{booking.car.location} </p>
                </div>
              </div>
            </div>

            {/* price  */}

            <div className=" md:col-span-1 flex flex-col justify-between gap-6">
              <div className=" text-sm text-gray-500 text-right">
                <p>Total Price</p>
                <h1 className=" text-2xl font-semibold text-red-500">
                  {" "}
                  {currency} {booking.price}
                </h1>
                <p>Booked on {booking.createdAt.split("T")[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
