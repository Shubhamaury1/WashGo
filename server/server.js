import dotenv from "dotenv";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import http from "http";
import { initSocket } from "./config/socket.js";
import chatRoutes from "./routes/chatRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
// dotenv.config();

import connectDB from "./config/db.js";
dotenv.config();
import app from "./app.js";

  


app.use("/api/vehicles", vehicleRoutes);

app.use("/api/packages", packageRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/addresses", addressRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/notifications", notificationRoutes);

// connect mongodb
connectDB();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);
const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

