const express = require('express');
const router = express.Router();
const SlotBooking = require('../model/slot-model'); // Adjust the path to your model

// Render the booking form
router.get('/', (req, res) => {
    res.render('bookturf');
});

// Handle form submission
router.post('/submit-booking', async (req, res) => {
    try {
        const { name, email, date, hours, endhour, phone } = req.body;

        // Validate required fields
        if (!name || !email || !date || !hours || !endhour || !phone) {
            req.flash('error', 'All fields are required');
            return res.redirect('/bookturf');
        }

        // Ensure hours and endhour are valid numbers
        const start = parseInt(hours, 10);
        const end = parseInt(endhour, 10);
        if (isNaN(start) || isNaN(end) || start >= end) {
            req.flash('error', 'Invalid hours specified');
            return res.redirect('/bookturf');
        }

        // Convert date to the format used in the database (e.g., YYYY-MM-DD)
        const formattedDate = new Date(date).toISOString().split('T')[0];

        // Check for booking conflicts
        const existingBookings = await SlotBooking.find({
            date: formattedDate,
            $or: [
                { startHour: { $lt: end }, endHour: { $gt: start } }
            ]
        });

        if (existingBookings.length > 0) {
            req.flash('error', 'Slot already booked');
            return res.redirect('/bookturf');
        }

        // Calculate price
        const duration = end - start;
        const price = duration * 1000; // Example pricing

        // Create and save new booking
        const newBooking = new SlotBooking({
            name,
            email,
            date: new Date(date),
            startHour: start,
            endHour: end,
            phone,
            price
        });

        await newBooking.save();

        req.flash('success', 'Booking successful');
        res.redirect('/bookturf');
    } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred');
        res.redirect('/bookturf');
    }
});

module.exports = router;