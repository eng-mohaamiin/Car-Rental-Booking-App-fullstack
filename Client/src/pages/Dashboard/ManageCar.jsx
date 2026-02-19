import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useAppContext } from "../../context/AppContext";

const ManageCar = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [getAllCars, setGetAllCars] = useState([]);
  const {setCarsDb,getCarsDb} = useAppContext([])

  const [limit] = useState(6);
  const [totalCars, setTotalCars] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // calculate total pages
  const totalPages = Math.ceil(totalCars / limit);

  // fetch all cars
  const fetchAllCars = async () => {
    try {
      setLoading(true); // start loading
      const skip = (page - 1) * limit; // calculate skip based on page
      const res = await fetch(
        `/api/owner/getAllCars?skip=${skip}&limit=${limit}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await res.json();
      setGetAllCars(data.cars); // set cars for table
      setTotalCars(data.totalCars); // set total cars for pagination
      setCarsDb(data.cars)
      setLoading(false); // stop loading
    } catch (error) {
      console.log(`Error fetching cars: ${error}`);
      setLoading(false);
    }
  };

  // fetch cars when page changes
  useEffect(() => {
    fetchAllCars();
  }, [page]);

  // toggleCarAvailablity 
  const toggleCarAvailablity = async (userId) => {
    try {
      const res = await fetch(`/api/owner/toggleCar/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        fetchAllCars()
      }
      else{
        toast.error("unAvailbility")
      }
    } catch (error) {
      console.log(
        `Error in manage car function toggle Car Availablity ${error}`,
      );
    }
  };



  // deleteCars 
const deleteCar = async (carId) => {
  confirmAlert({
    title: "Confirm Deletion",
    message: "Are you sure you want to delete this car?",
    buttons: [
      {
        label: "Yes",
        onClick: async () => {
          try {
            const res = await fetch(`/api/owner/deleteCar/${carId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });

            const data = await res.json();

            if (data.success) {
              toast.success(data.message);
              fetchAllCars();
            }
          } catch (error) {
            console.log("Error in deleting car:", error);
          }
        },
      },
      {
        label: "No",
      },
    ],
  });
};





















  // calculate showing numbers for current page
  const firstItem = (page - 1) * limit + 1;
  const lastItem = Math.min(page * limit, totalCars);

  return (
    <div>
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 scroll-smooth">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Unit's List</h2>
            <p className="text-gray-500 text-sm mt-1">
              List of Vehicles & Motorcycles
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <i className="fas fa-filter text-gray-500"></i> Filter
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <i className="fas fa-file-export text-gray-500"></i> Export CSV
            </button>
            <Link
              to="/owner/add-car"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center gap-2"
            >
              <i className="fas fa-plus"></i> Add New Unit
            </Link>
          </div>
        </div>

        {/* Cars Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  <th className="px-6 py-4">Car</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center rounded-tr-xl">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Loading State */}
              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center py-10">
                      <FaSpinner className="animate-spin inline-block text-2xl mr-2 text-blue-600" />
                      Loading Cars...
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="divide-y divide-gray-100 text-sm">
                  {getCarsDb.map((car) => (
                    <tr
                      key={car._id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      {/* Car + Image */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={car.image}
                            className="w-12 h-12 rounded-lg aspect-square object-cover border border-gray-200"
                            alt={car.model}
                          />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {car.brand} {car.model}
                            </p>
                            <span className="text-xs text-gray-500">
                              {car.year}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 text-gray-600">
                        {car.category}
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {currency}
                        {car.pricePerDay}/day
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            car.isAvaliable
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {car.isAvaliable ? "Available" : "Unavailable"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={()=> toggleCarAvailablity(car._id)}
                            className="w-8 h-8 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center"
                            title="View"
                          >
                            <img
                              src={
                                car.isAvaliable
                                  ? assets.eye_close_icon
                                  : assets.eye_icon
                              }
                              alt=""
                            />
                          </button>
                          <button
                          onClick={()=> deleteCar(car._id)}
                            className="w-8 h-8 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center"
                            title="Delete"
                          >
                            <i className="far fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>

          {/* Pagination + Showing X-Y of Z */}
          <div className="p-6 border-t border-gray-100 flex items-center justify-between">
            {/* Showing X-Y of Z */}
            <p className="text-sm text-gray-500">
              Showing {firstItem} - {lastItem} of {totalCars}
            </p>

            {/* Pages */}
            <nav className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`px-3 py-1 rounded-md ${
                    page === index + 1
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageCar;
