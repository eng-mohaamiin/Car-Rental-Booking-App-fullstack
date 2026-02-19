// check availability of car for a given date

import Booking from "../Models/Booking.js";
import Car from "../Models/car.js";

export const checkavailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    // Soo hel booking kasta oo pickupDate-kiisu ka yar yahay ama la mid yahay returnDate cusub.
    pickupDate: { $lte: returnDate },
    // Soo hel booking kasta oo returnDate-kiisu ka weyn yahay ama la mid yahay pickupDate cusub.

    returnDate: { $gte: pickupDate },
  });

  return bookings.length === 0;
};

export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    // fetch all available cars for the give lcocation
    const cars = await Car.find({ location, isAvaliable: true });
    console.log("this is cars available", cars);

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkavailability(
        car._id,
        pickupDate,
        returnDate,
      );

      // return { ...car_doc, isAvailable: isAvailable };
      return { ...car.toObject(), isAvailable };
    });

    // Waxay sugaysaa dhammaan Promises-ka inay dhammaadaan
    // Markay dhammaadaan → waxay kuu soo celineysaa array natiijooyinka dhabta ah

    let availableCars = await Promise.all(availableCarsPromises);

    availableCars = availableCars.filter((car) => car.isAvailable === true);

    res.json({ success: true, availableCars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Api to create booking

export const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { car, pickupDate, returnDate } = req.body;
    const isAvailable = await checkavailability(car, pickupDate, returnDate);

    if(!userId){
      return res.json({data: false, message: "You have to login"})
    }

    if (!isAvailable) {
      return res.json({ success: false, message: "horey aa loo kireeyay" });
    }

    // idga lasoo baasay ka dhex raadi cars
    const carDate = await Car.findById(car);
    if (!carDate.isAvaliable) {
  return res.json({ success: false, message: "Car is unavaiable" });
}

    // calculate price based on pickupDate and returnDate

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));

    // check if  the returnDate lesthan oo equal picked
    if (returned <= picked) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after pickup date",
      });
    }

    // calculate price number of days

    const price = carDate.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carDate.owner,
      user: userId,
      pickupDate,
      returnDate,
      price,
    });

    return res
      .status(201)
      .json({ success: true, message: "Bookin Created Successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// list user booking
export const getUserBooking = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ user: userId })
      .populate("car")
      .sort({ createdAt: -1 });
    //   markii la daawaco waxa soo baxaayo
    //   [

    //   {
    //     user: "6565656",
    //     car: {
    //       name: "Toyota",
    //       location: "Hargeisa",
    //     },
    //   }
    // ];

    res
      .status(201)
      .json({ success: true, message: "your bookings", bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// get owner bookings

export const getOwnerBokings = async (req, res) => {
  try {
    const ownerRole = req.user.role;
    const userId = req.user._id;

    // user is not owner
    if (ownerRole !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // else user is owner

    //  wuxuu soo celinaa Dhamaan cars uu owner leeyahay
    const bookings = await Booking.find({ owner: userId })
      // car waxay kuu haysaaa car idgiisa marka waxaa laguu soo celinaa car oo idil
      // Kaliya car-ka ku jira booking-kaas
      //User-ka kireystay -kaas
      .populate("car user")
      .select("-password")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({
        success: true,
        message: "You are get it owner booking",
        bookings,
      });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// api to change booking status like pending

export const changeBookingStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookingId = req.params.id;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (booking.owner.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    // else

    booking.status = status;

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "You change the status of booking",
      booking,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
