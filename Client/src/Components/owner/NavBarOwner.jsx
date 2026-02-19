import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const NavBarOwner = () => {
  const { currentUser } = useAppContext();
  const [image, setImage] = useState("");

  // Load image from localStorage when page loads
  useEffect(() => {
    const savedImage = localStorage.getItem("ownerImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem("ownerImage", reader.result);
    };
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      <button className="md:hidden text-gray-500 hover:text-blue-600">
        <i className="fas fa-bars text-xl"></i>
      </button>

      <div className="flex items-center gap-4 ml-auto">
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
          <i className="far fa-bell"></i>
        </button>

        <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              {currentUser?.name}
            </p>
            <p className="text-xs text-gray-500">
              {currentUser?.role || "Manager"}
            </p>
          </div>

          {/* Image Upload */}
          <label className="relative cursor-pointer">
            <img
              src={
                image ||
                currentUser?.image ||
                `https://ui-avatars.com/api/?name=${currentUser?.name}`
              }
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </header>
  );
};

export default NavBarOwner;
