import jwt from "jsonwebtoken";
import User from "../Models/userModeL.js";

 const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // haduu token jirin
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized: no token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // hadii uu expire uu noqdo tokenka
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invvalid Token" });
    }

    // waxaa iiga raadisaa idga xogta inta kale isoo celi passwordka lee ka reeb
    const user = await User.findById(decoded.id).select("-password");
    // console.log("this is user id", user)

    // hadii lasoo waayo
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(`Error in protect route middleware ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export default protectRoute;
