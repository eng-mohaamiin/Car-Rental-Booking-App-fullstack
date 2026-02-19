import User from "../Models/userModeL.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookies from "../utils/generateTokenAndSetCookies.js";
import Car from "../Models/car.js";

// register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Fill all the fields",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // hadii emailka uu qaldanyahay
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid Email Format",
      });
    }

    const userExists = await User.findOne({ email });

    // haduu horey u jiray
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    generateTokenAndSetCookies(user._id, res);

    return res.status(201).json({
      success: true,
      message: "user signUp successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: ` Error in register controllers Invalid user data ${error.message}`,
    });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: `user with the ${email} email doest'n exist`,
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ err: "Invalid credentials" });
    }

    generateTokenAndSetCookies(user._id, res);

    return res.status(201).json({
      success: true,
      message: "user login successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: ` Error in login controllers Invalid user data ${error.message}`,
    });
  }
};

export let logOut = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "LogOut Successfully" });
  } catch (error) {
    console.error(`The Error in Logout page authcontrollers ${error.message}`);

    return res
      .status(500)
      .json({ success: false, error: "Internal Serval Error" });
  }
};

// getUser login data

// export const getUserData = async (req, res) => {
//   const user = req.user._id;

//   if (!user) {
//     return res.status(401).json({ error: "You are not authenticated" });
//   }

//   return res.json({
//     success: true,
//     user,
//   });
// };

// get all cars for frontEnd

// export const getCars = async (req, res) => {
//   // get the list availabe cars
//   const cars = await Car.find({isAvailable: true})

//   return res.json({
//     success: true,
//     cars
//   });
// };
