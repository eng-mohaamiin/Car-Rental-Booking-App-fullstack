import { useRef, useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [image, setImage] = useState(null);
  const fileInputRefrene = useRef(null);
  const { setCarsDb, getCarsDb } = useAppContext();


  const [cars, setCar] = useState({
    image: "",
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  let handleImageChange = (e) => {
    let file = e.target.files[0];

    // hadii sawir lasoo geliyo
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setCar((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!cars.brand) {
      return toast.error("Brand is required");
    }
    if (!cars.model) {
      return toast.error("Model is required");
    }
    if (!cars.year) {
      return toast.error("Year is required");
    }
    if (!cars.pricePerDay) {
      return toast.error("Pirce is required");
    }
    if (!cars.category) {
      return toast.error("Category is required");
    }
    if (!cars.fuel_type) {
      return toast.error("Fuel Type is required");
    }
    if (!cars.transmission) {
      return toast.error("Transmission is required");
    }
    if (!cars.seating_capacity) {
      return toast.error("Seating capacity Type is required");
    }
    if (!cars.location) {
      return toast.error("Location  Type is required");
    }
    if (!cars.description) {
      return toast.error("Description  Type is required");
    }

    const res = await fetch("/api/owner/addCar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(cars),
    });

    const data = await res.json();

    toast.success("Car Added successfully");

    setCarsDb(data.car)

    setCar({
      brand: "",
      model: "",
      year: 0,
      pricePerDay: 0,
      category: "",
      transmission: "",
      fuel_type: "",
      seating_capacity: 0,
      location: "",
      description: "",
    });
  };

  console.log(cars);
  return (
    <div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50 relative">
        {/* Scrollable Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Add New Vehicle
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Enter the car details below to add it to your fleet.
              </p>
            </div>

            <form className="space-y-6" onSubmit={onSubmitHandler}>
              {/* Column layout only */}
              <div className="grid grid-cols-1 gap-6">
                {/* Image Upload */}
                <div></div>

                {/* Vehicle Details */}
                <div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="car-image"
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <img
                          onClick={() => fileInputRefrene.current.click()}
                          className="h-14 rounded"
                          src={
                            image
                              ? image
                              : `https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png`
                          }
                          alt=""
                        />
                        <p className="text-sm text-gray-500">
                          Upload a picture of your car
                        </p>
                      </label>
                      <input
                        onChange={handleImageChange}
                        ref={fileInputRefrene}
                        id="car-image"
                        type="file"
                        hidden
                      />
                    </div>

                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Brand */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                            Brand
                          </label>
                          <input
                            onChange={(e) =>
                              setCar({ ...cars, brand: e.target.value })
                            }
                            value={cars.brand}
                            type="text"
                            placeholder="e.g. Toyota"
                            className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>

                        {/* Model */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                            Model
                          </label>
                          <input
                            onChange={(e) =>
                              setCar({ ...cars, model: e.target.value })
                            }
                            value={cars.model}
                            type="text"
                            placeholder="e.g. Camry"
                            className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {/* Year */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                            Year
                          </label>
                          <input
                            onChange={(e) =>
                              setCar({ ...cars, year: e.target.value })
                            }
                            value={cars.year}
                            type="number"
                            placeholder="2024"
                            className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                        {/* price */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                            Daily Price ({currency})
                          </label>
                          <input
                            onChange={(e) =>
                              setCar({ ...cars, pricePerDay: e.target.value })
                            }
                            value={cars.pricePerDay}
                            type="number"
                            placeholder="2024"
                            className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>

                        {/* Category */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                            Category
                          </label>
                          <select
                            onChange={(e) =>
                              setCar({ ...cars, category: e.target.value })
                            }
                            value={cars.category}
                            className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
                          >
                            <option>Select Category</option>
                            <option>Sedan</option>
                            <option>SUV</option>
                            <option>Coupe</option>
                            <option>Hatchback</option>
                            <option>Convertible</option>
                            <option>Van</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Transmission */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                            Transmission
                          </label>
                          <select
                          className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
                            value={cars.transmission}
                            onChange={(e) =>
                              setCar({ ...cars, transmission: e.target.value })
                            }
                          >
                            <option value="">Select Transmission</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                            <option value="Semi-Automatic">
                              Semi-Automatic
                            </option>
                          </select>
                        </div>

                        {/* Fuel Type */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                            Fuel Type
                          </label>
                          <select
                            onChange={(e) =>
                              setCar({ ...cars, fuel_type: e.target.value })
                            }
                            value={cars.fuel_type}
                            className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
                          >
                            <option className="Gas">Gas</option>
                            <option className="Diesel">Diesel</option>
                            <option className="Petrol">Petrol</option>
                            <option className="Electric">Electric</option>
                            <option className="Hyprid">Hyprid</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Seating */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                            Seating
                          </label>
                          <input
                            onChange={(e) =>
                              setCar({
                                ...cars,
                                seating_capacity: e.target.value,
                              })
                            }
                            value={cars.seating_capacity}
                            type="number"
                            placeholder="5"
                            className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                          Fuel Type Location{" "}
                        </label>
                        <select
                          onChange={(e) =>
                            setCar({ ...cars, location: e.target.value })
                          }
                          value={cars.location}
                          className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
                        >
                          <option className="New York">New York</option>
                          <option className="Los Angeles">Los Angeles</option>
                          <option className="Houston">Houston</option>
                          <option className="Chicacgo">Chicacgo</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                      <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                        Description
                      </label>
                      <textarea
                        onChange={(e) =>
                          setCar({ ...cars, description: e.target.value })
                        }
                        value={cars.description}
                        rows="3"
                        placeholder="Enter vehicle description..."
                        className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-start gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-200 transition-all transform hover:-translate-y-0.5"
                >
                  List your car
                </button>


{/* 
                {
                  toast.promise(
                         saveSettings(settings),
                          {
                            loading: 'Saving...',
                            success: <b>Settings saved!</b>,
                            error: <b>Could not save.</b>,
                          }
                   )
                            } */}
                
                
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCar;
