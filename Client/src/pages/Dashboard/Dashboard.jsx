import React, { useEffect, useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;
     const location = useLocation();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBooking: 0,
    complateBooking: 0,
    recentBooking: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBooking,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.complateBooking,
      icon: assets.listIconColored,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`/api/owner/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // if(isOwner){
    //   fetchDashboardData()
    // }

    fetchDashboardData();
  }, []);

  console.log(data.recentBooking.map((recent) => console.log(recent)));

  // console.log(data.monthlyRevenue);

  return (
    <div>
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 scroll-smooth">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back, here's what's happening closely.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-sm">
              <i className="fas fa-download mr-2"></i> Report
            </button>
            <a
              href="/owner/add-car"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
            >
              <i className="fas fa-plus mr-2"></i> Add Car
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <img src={card.icon} alt={card.title} className="w-6 h-6" />
                </div>

                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +0%
                </span>
              </div>

              <h3 className="text-sm font-medium text-gray-500">
                {card.title}
              </h3>

              <p className="text-2xl font-bold text-gray-800 mt-1">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity & Top Cars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">
                Recent Bookings
              </h3>


              {/* {
                ownerMenuLinks.map((link)=>{

                  const isActive = location.pathname === link.path;
                  return (

                  )

                  

                    })
              } */}


              <Link to="manage-bookings"
                // href="/owner/manage-bookings"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-500 uppercase font-medium text-xs"></thead>

                <tbody className="divide-y divide-gray-100">
                  {data.recentBooking.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-gray-400"
                      >
                        No recent bookings
                      </td>
                    </tr>
                  ) : (
                    data.recentBooking.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Car Name */}
                        <td className="px-4 py-4 font-medium text-gray-800">
                          {booking.car?.brand} {booking.car?.model}
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                        {/* price  */}

                        <td>
                          <span className="text-gray-700">{currency}{booking.price}</span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
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
                          </span>
                        </td>
                        
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Available Cars Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between m-2">
              <h3 className="text-lg font-bold text-gray-800">
                Monthly Revenue
              </h3>
            </div>
            <p>Revenue for current month</p>

            <h5 className="mt-5 text-2xl font-semibold text-red-400">
              {currency} {data.monthlyRevenue}
            </h5>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
