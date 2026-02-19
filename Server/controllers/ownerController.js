import Car from "../Models/car.js";
import User from "../Models/userModeL.js";
import fs from "fs";
// import imagekit from "../config/imageKit.js";
import Booking from "../Models/Booking.js";
import { v2 as cloudinary } from "cloudinary";

// Change role to owner
// export const changeRoleToOwner = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(401).json({ success: false, message: "You are not authenticated" });
//     }

//     user.role = "owner";
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Now you can list cars",
//     });
//   } catch (error) {
//     console.log(`Error in changeRoleToOwner: ${error.message}`);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// AddCar
export const addCar = async (req, res) => {
  try {
    let {
      brand,
      model,
      image,
      year,
      category,
      seating_capacity,
      fuel_type,
      transmission,
      pricePerDay,
      location,
      description,
    } = req.body;

    if (
      !brand ||
      !model ||
      !image ||
      !year ||
      !category ||
      !seating_capacity ||
      !fuel_type ||
      !transmission ||
      !pricePerDay ||
      !location ||
      !description
    ) {
      return res
        .status(400)
        .json({ message: "formka oo dhan waaa inaa buuxisaa " });
    }

    console.log(req.body);

    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "You are not authenticated" });
    }

    // upload the image in the cloudinary
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      image = uploadedImage.secure_url;
    }

    const newCarsData = new Car({
      brand,
      model,
      image,
      year,
      category,
      seating_capacity,
      fuel_type,
      transmission,
      pricePerDay,
      location,
      description,
      owner: userId,
    });

    await newCarsData.save();

    return res.status(201).json({
      success: true,
      message: "Cars added successfully",
      car: newCarsData,
    });
  } catch (error) {
    console.log(`Error in addCar: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// list owner cars

export const getOwnerCars = async (req, res) => {
  try {
    const userId = req.user._id;

    // kaliya waxaa la soo celinaa car owner login ah hadda systemka ku jira inta
    //  uu cars sameeyay
    const cars = await Car.find({ owner: userId });

    return res.status(200).json({
      success: true,
      cars,
      message: "you get it your cars ",
    });
  } catch (error) {
    console.log(`Error in getOwnercars: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all cars only can see that car on the admin

export const getAllCars = async (req, res) => {
  //  waxaa ii sooo bandhigdaa query params waxa laga soo diray hadii kale 1 xabo ii soo bandhig
  const limit = parseInt(req.query.limit) || 1;
  const skip = parseInt(req.query.skip) || 0;
  const totalCars = await Car.countDocuments();

  const cars = await Car.find()
    .limit(limit)
    // 6 ugu horeyso ayey ka boodeysa 6 kale ee cusub ayey kusoo dareysaa
    .skip(skip)

    // owner wuxuu kuu hayaa qofka car sameeyay id giisa marka populate waxaan u dhiiway owner
    // marka waxay kuu soo celineysaa id ga u dhiibta xogtiisa oo idil
    .populate({ path: "owner", select: "-password" });

  return res.status(201).json({
    success: true,
    message: "You get it all cars in db",
    cars,
    limit,
    skip,
    totalCars,
  });
};

// toggleCarAvailablity
export const toggleCarAvailablity = async (req, res) => {
  try {
    const userId = req.user._id;
    const id = req.params.id;

    const car = await Car.findById(id);

    // idga qofka sameey car haduu san la mid aheyn userIdgaa ee systemka ku jira cookie

    // idga clickta
    if (car.owner.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.isAvaliable = !car.isAvaliable;

    await car.save();

    return res.status(200).json({
      success: true,
      message: "Availability Toggle",
      car,
    });
  } catch (error) {
    console.log(`Error in getOwnercars: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete car

// warka kooban waxa weeye hadii ownerka uu delete sameeyo baabuurkaas
// uu deletegareeyay uu horey qof i kireystay ownerka lee la deletegareynaayaa
// balse baabuurka qofka kireystay lama deletegaerynaayo dib danbe baabuurkaas
// loooma kireyn karo sawabotto ah owner waa null

export const deleteCar = async (req, res) => {
  try {
    const userId = req.user._id;
    // const carId = req.body

    // carid weeye
    const id = req.params.id;

    const car = await Car.findById(id);

    // hadii car uusan jirin

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    // idga qofka sameey car haduu san la mid aheyn userIdgaa ee systemka ku jira cookie

    if (car.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // ownerka lee tir tir
    car.owner = null;
    // baabuurka lama kireyn karo
    car.isAvaliable = false;

    await car.save();

    return res.status(200).json({
      success: true,
      message: "car remove",
      car,
    });
  } catch (error) {
    console.log(`Error in getOwnercars: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get dashboard data

export const getDashobarData = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    if (role !== "owner") {
      return res
        .status(404)
        .json({ success: false, message: "You are not owner please get back" });
    }

    // else role is owner
    const car = await Car.find({ owner: userId });

    const bookings = await Booking.find({ owner: userId })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBooking = await Booking.find({
      owner: userId,
      status: "Pending",
    });
    const completeBooking = await Booking.find({
      owner: userId,
      status: "Confirmed",
    });

    // calculate monthly booking

    const monthlyRevenue = bookings
      .filter((booking) => booking.status === "Confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalCars: car.length,
      totalBookings: bookings.length,
      pendingBooking: pendingBooking.length,
      complateBooking: completeBooking.length,
      recentBooking: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.status(201).json({ success: true, dashboardData });
  } catch (error) {
    console.log(`Error in getOwnercars: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// api to update user profile

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    let { name, image } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    
    // haddii image cusub jiro → ku upload garee cloudinary
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);

      user.image = uploadedImage.secure_url;
    }

    // haddii name la beddelay
    if (name) {
      user.name = name;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.log("Error in updateUserProfile:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
