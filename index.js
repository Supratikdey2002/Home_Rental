const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listings.js");
const BookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");
app.use(cors()); //for accessing cross origin resources of different domain
app.use(express.json()); //for parsing the incoming json formated requests
app.use(express.static("public"));

/*Routes*/
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", BookingRoutes);
app.use("/users", userRoutes);
// mongoose setup

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
