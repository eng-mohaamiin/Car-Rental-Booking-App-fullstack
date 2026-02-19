import express from "express";
import protectRoute from "../Middleware/ProtectRoute.js"; // default import
import { addCar, 
    getOwnerCars,
    getAllCars,
    toggleCarAvailablity,
    deleteCar,
    getDashobarData,
    updateUserProfile
    // changeRoleToOwner,
    //  deleteCar, getDashobarData, getOwnerCars, toggleCarAvailablity, updateUserProfile 
    } from "../controllers/ownerController.js";

const router = express.Router();

// router.post("/changeRole", protectRoute, changeRoleToOwner);

router.post("/addCar", protectRoute, addCar);

router.get("/cars", protectRoute, getOwnerCars);
router.get("/getAllCars", protectRoute, getAllCars);

// router.post("/toggleCar/:id", protectRoute, toggleCarAvailablity);
router.post("/toggleCar/:id", protectRoute, toggleCarAvailablity);


router.delete("/deleteCar/:id", protectRoute, deleteCar);

router.get("/dashboard", protectRoute, getDashobarData);
router.put("/update-profile", protectRoute, updateUserProfile);


// router.post("/updateImage", protectRoute, upload.single("image"), updateUserProfile);


export default router;
