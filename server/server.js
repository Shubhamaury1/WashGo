import dotenv from "dotenv";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

// dotenv.config();

import connectDB from "./config/db.js";

import app from "./app.js";

  
dotenv.config();

app.use("/api/vehicles", vehicleRoutes);

app.use("/api/packages", packageRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/addresses", addressRoutes);
// connect mongodb
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
