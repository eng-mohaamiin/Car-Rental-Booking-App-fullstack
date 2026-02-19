import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = ({setShowLogin}) => {
  const [open, setOpen] = useState(false);

  const {currentUser,signOutUser} = useAppContext()
  const navigate = useNavigate()

  // logOut functionality 


    const logOut = async ()=>{
    

    try {
      const res = await fetch("/api/user/logOut",{
        method: "POST"
      })

      const data = await res.json()


      signOutUser()

      toast.success("signOut successfully");


    } catch (error) {
      console.log(error)
    }
  }


  const listEroro  = ()=>{
    toast.error("you must login")
  }




  return (
    <>
      <nav className="w-full py-6 px-4 sm:px-8 lg:px-16 flex justify-between items-center bg-transparent relative z-20 border-b-2">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold italic text-red-500 tracking-wider"
        >
          TOPCAR
        </NavLink>

        {/* Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-gray-900 font-semibold border-b-2 border-gray-900 pb-1"
                : "text-gray-500 hover:text-gray-900 transition font-medium"
            }
          >
            Home Page
          </NavLink>

          <NavLink
            to="/cars"
            className={({ isActive }) =>
              isActive
                ? "text-gray-900 font-semibold border-b-2 border-gray-900 pb-1"
                : "text-gray-500 hover:text-gray-900 transition font-medium"
            }
          >
            Cars
          </NavLink>

          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              isActive
                ? "text-gray-900 font-semibold border-b-2 border-gray-900 pb-1"
                : "text-gray-500 hover:text-gray-900 transition font-medium"
            }
          >
            My Bookings
          </NavLink>

          <NavLink
          to={currentUser && "/owner"}
          onClick={()=> !currentUser  && listEroro() }
            className={({ isActive }) =>
              isActive
                ? "text-gray-900 font-semibold border-b-2 border-gray-900 pb-1"
                : "text-gray-500 hover:text-gray-900 transition font-medium"
            }
          >
            {/* {currentUser.role === 'owner' && 'Dashboard'} */}
            {currentUser?.role === 'owner' && 'Dashboard'}

          </NavLink>
        </div>

        {/* Auth */}
        <Link to ="/signUp"
        onClick={()=> currentUser ? logOut(): ''}
        >
          <a
            href="#"
            className="px-6 py-2.5 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-colors hidden md:flex"
          >
            {currentUser ? "LogOut" : "Login"}
            
          </a>
        </Link>
        <button className="sm:hidden" onClick={() => setOpen(!open)}>
          <img src={open ? assets.close_icon : assets.menu_icon} alt="" />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
