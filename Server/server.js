import express from "express"
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import router from "./routes/user.Routes.js";
import cookieParser from "cookie-parser";
import ownerRouter from "./routes/owner.routes.js"
import bookingRouter from "./routes/booking.routes.js"
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";







cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express()
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    credentials: true,               // ✅ muhiim si cookies loo diro
  })
);



// routes
app.use("/api/user", router);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);


app.get("/", (req, res) => {
  res.send("API is running...");
});
// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
