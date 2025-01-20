const express = require("express");
const router = express.Router();
const Admin = require("../model/admin");
const slotBooking = require("../model/slot-model");
const Contact = require("../model/contact");  // Import the Contact model

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      req.flash("error", "Incorrect email or password");
      return res.redirect("/admin/login");
    }

    if (admin.password === password) {
      req.flash("success", "Login successful");

      // Fetch all bookings
      const bookings = await slotBooking.find();

      // Calculate total revenue
      const totalRevenueData = await slotBooking.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$price" } } }
      ]);
      const totalRevenue = totalRevenueData.length > 0 ? totalRevenueData[0].totalRevenue : 0;

      // Calculate total bookings count
      const totalBookingsCount = await slotBooking.countDocuments();

      // Fetch all contact messages
      const contacts = await Contact.find();

      res.render("admin", {
        bookings,
        totalRevenue,
        totalBookingsCount,
        contacts
      });
    } else {
      req.flash("error", "Incorrect email or password");
      return res.redirect("/admin/login");
    }
  } catch (error) {
    console.error(error);
    req.flash("error", "An error occurred while logging in");
    return res.redirect("/admin/login");
  }
});

module.exports = router;
