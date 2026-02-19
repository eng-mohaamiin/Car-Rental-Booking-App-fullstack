import express from "express"
import { Router } from "express"
import { changeBookingStatus, checkAvailabilityOfCar, createBooking, getOwnerBokings, getUserBooking } from "../controllers/bookingController.js"
import protectRoute from "../Middleware/ProtectRoute.js"; // default import

const router = Router()

router.post("/checkAvailability", checkAvailabilityOfCar)
router.post("/createBooking", protectRoute, createBooking)
router.get("/user", protectRoute, getUserBooking)
router.get("/owner", protectRoute, getOwnerBokings)
router.post("/changeStatus/:id", protectRoute, changeBookingStatus)


export default router