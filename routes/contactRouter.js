// routes/contact.js

const express = require('express');
const router = express.Router();
const Contact = require('../model/contact');

// Route to render the contact form page
router.get('/', (req, res) => {
    res.render('contact');
});

// Route to handle contact form submissions
router.post('/send', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Create a new contact document
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        // Save the contact document to the database
        await newContact.save();

        // Send a success response
        req.flash('success', 'Your message has been sent successfully!');
        res.redirect('/contact');
    } catch (error) {
        console.error('Error saving contact form:', error);
        req.flash('error', 'An error occurred while sending your message. Please try again.');
        res.redirect('/contact');
    }
});

module.exports = router;
