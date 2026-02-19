import React, { useState } from "react";
import { dummyCarData, ownerMenuLinks } from "../../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [image, setImage] = useState("");
  const user = dummyCarData;
  const {currentUser,signOutUser} = useAppContext()
  const navigate = useNavigate()

  const updateImage = () => {
    user.image = URL.createObjectURL(image);

    setImage("");
  };


   const location = useLocation();

  console.log(location.pathname);



  // logout 

  
    const logOut = async ()=>{
    

    try {
      const res = await fetch("/api/user/logOut",{
        method: "POST"
      })

      const data = await res.json()


      signOutUser()

      toast.success("signOut successfully");
      navigate("/")


    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        
        {/* SIDEBAR */}
        <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
          <div className="p-6 border-b border-slate-800">
            <Link to={"/"} className="text-xl font-bold">
              Rent<span className="text-blue-500">Ride</span>
            </Link>
          </div>

          {/* MENU */}
        <nav className="flex-1 py-6 space-y-1">
          {ownerMenuLinks.map((link, index) => {
            // location ama pageka hadda la joogo haduu la mid yahay link.path waxa ku jira 
            const isActive = location.pathname === link.path;

            return (
              <NavLink
                key={index}
                to={link.path}
                className={`flex items-center gap-3 px-6 py-3 transition-colors
                  ${
                    isActive
                      ? "bg-slate-800 text-blue-400 border-r-4 border-blue-500"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <img
                  src={isActive ? link.coloredIcon : link.icon}
                  alt={link.name}
                  className="w-5 h-5"
                />
                <span className="font-medium">{link.name}</span>
              </NavLink>
            );
          })}
        </nav>
          <div
          onClick={()=> currentUser ? logOut(): ''}
          className="p-4 border-t border-slate-800 text-slate-400 cursor-pointer">
            Logout
          </div>
        </aside>
        
      </div>
    </>
  );
};

export default Sidebar;
