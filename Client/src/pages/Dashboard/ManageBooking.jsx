import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;
  const [input, setInput] = useState("");
  

  // fetchOwnerBooking

  const fetchOwnerBooking = async () => {
    try {
      const res = await fetch(`/api/bookings/owner`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBooking();
  }, []);

  // changeBookingStatus
  const changeBookingStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/changeStatus/${bookingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        fetchOwnerBooking();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };





  // searching bookings 

  const { getCarsDb } = useAppContext();
  
    const [filterCars, setFilterCars] = useState([]);
  
    const applyFilter = () => {
  if (!input) {
    fetchOwnerBooking();
    return;
  }

  const filtered = bookings.filter((booking) =>
    booking.car.brand.toLowerCase().includes(input.toLowerCase()) ||
    booking.car.model.toLowerCase().includes(input.toLowerCase()) ||
    booking.status.toLowerCase().includes(input.toLowerCase())
  );

  setBookings(filtered);
};




     useEffect(() => {
  applyFilter();
}, [input]);


  return (
    <div>
      <main class="flex-1 overflow-x-hidden overflow-y-auto p-6 scroll-smooth">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Booking Management</h2>
            <p class="text-gray-500 text-sm mt-1">
              Track and manage car reservations.
            </p>
          </div>
          <div class="flex gap-3">
            <div class="relative">
              <input
              onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Search by name, Booking ID..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-72"
              />
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
            <button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-sm">
              <i class="fas fa-filter mr-2"></i> Filter
            </button>
          </div>
        </div>
        {/* <!-- Status Tabs --> */}
        <div class="border-b border-gray-200 mb-6">
          <nav class="-mb-px flex space-x-8">
            <a
              href="#"
              class="border-blue-500 text-blue-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
            >
              All Bookings
              
            </a>
           
          
           
          </nav>
        </div>

        {/* <!-- Bookings Table --> */}
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-600">
              <thead class="bg-gray-50 text-gray-500 uppercase font-medium text-xs">
                <tr>
                  <th class="px-6 py-4">Car</th>
                  <th class="px-6 py-4">Date Rnage</th>
                  <th class="px-6 py-4">Total</th>
                  <th class="px-6 py-4">Payment</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              {/* {
                bookings.map((booking,index)=>(

                // <tr key={index}>

                //    <img
                //       src={booking.car.image}
                //           className="w-12 h-12 aspect-square rounded-lg object-cover border border-gray-200"
                //           alt={booking.model}
                //         />
                // </tr>  

                


             







                ))
              } */}

              <tbody class="divide-y divide-gray-100">
                {bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    {/* Car + Image */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.car.image}
                          className="w-12 h-12 rounded-lg aspect-square object-cover border border-gray-200"
                          alt={booking.model}
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {booking.car.brand} {booking.car.model}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* pickup date and return data */}
                    <td className="px-6 py-4 text-gray-600">
                      {booking.pickupDate.split("T")[0]} to
                      {booking.returnDate.split("T")[0]}
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {/* {currency} */}
                      {currency}
                      {booking.price}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {/* {Offline} */}
                      <span className="bg-gray-100 px-3 rounded-full text-xs py-1">
                        Offline
                      </span>
                    </td>

                    {/* status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold 
      ${
        booking.status === "Confirmed"
          ? "bg-green-100 text-green-700"
          : booking.status === "Cancelled"
            ? "bg-yellow-100 text-yellow-700"
            : booking.status === "Pending"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
      }
    `}
                      >
                        {booking.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          changeBookingStatus(booking._id, e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!-- Check Pagination --> */}
        <div class="mt-6 flex justify-between items-center text-sm text-gray-500">
          <p>Showing 1 to 4 of 24 entries</p>
          <nav class="flex gap-2">
            <button class="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-md disabled:opacity-50">
              <i class="fas fa-chevron-left"></i> Previous
            </button>
            <button class="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-md">
              Next <i class="fas fa-chevron-right"></i>
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default ManageBooking;
