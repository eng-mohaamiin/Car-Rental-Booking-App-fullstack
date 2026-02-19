import React from "react";
import Title from "./Title";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";



const FeaturedSection = () => {
  const navigate = useNavigate();
  const {getCarsDb} = useAppContext()

  // console.log("this is all cars", getCarsDb)


  return (
    <section className="bg-gray-50 py-24  md:px-16  max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Title
        title="Featured Vehicles"
        subTitle="Explore our selection of premium vehicles available for your next adventure."
      />

      {/* Cars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {getCarsDb.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      {/* See all */}
      <div
        onClick={() => {
          navigate("/cars");
          window.scrollTo(0, 0);
        }}
        className="flex justify-between items-center mt-14 cursor-pointer"
      >
         <div class="text-center mx-auto">
                <button
                    class="px-8 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition">
                    See all <span class="ml-1">→</span>
                </button>
            </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
