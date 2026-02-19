import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBooking from "./pages/MyBooking";
import Footer from "./Components/Footer";
import Layout from "./pages/Dashboard/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddCar from "./pages/Dashboard/AddCar";
import ManageCar from "./pages/Dashboard/ManageCar";
import ManageBooking from "./pages/Dashboard/ManageBooking";
import NavBarOwner from "./Components/owner/NavBarOwner";
import { Toaster } from "react-hot-toast";
import SignUp from "./Components/SignUp";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  // Haddii URL-ku ka bilaabmo /owner, Navbar & Footer lama muujiyo
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  // const isHeader = useLocation().path.startsWith("/owner")

  return (
    <>
    <Toaster />
     

      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      {/* {isOwnerPath && <NavBarOwner />} */}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        

        {/* Dashboard Routes */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCar />} />
          <Route path="manage-bookings" element={<ManageBooking />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer setShowLogin={setShowLogin} />}
    </>
  );
};

export default App;
