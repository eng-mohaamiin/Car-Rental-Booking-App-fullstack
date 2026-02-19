import { Router } from "express";
import { 
  // getCars, 
  // getUserData, 
  login, 
  logOut, 
  registerUser 
} from "../controllers/userController.js";
// import protectRoute from "../Middleware/ProtectRoute.js"; 

const router = Router();

// User authentication routes
router.post("/register", registerUser);
router.post("/login", login);
router.post("/logOut", logOut);

// Protected routes (JWT required)
// router.get("/data", protectRoute, getUserData);
// router.get("/cars", protectRoute, getCars);

export default router;
