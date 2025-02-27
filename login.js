const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Route for handling login
app.post('/login', async (req, res) => {
    const { username, password, 'g-recaptcha-response': recaptchaResponse } = req.body;
    const secretKey = '6LeAieQqAAAAABwnbENY8_tF2l9Qf7QEAUyQQKOv'; 

    // Send a request to Google reCAPTCHA to verify the response
    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: secretKey,
                response: recaptchaResponse,
            },
        });

        if (response.data.success) {
            // Continue with login logic (e.g., check username and password)
            res.send('Login successful!');
        } else {
            // reCAPTCHA verification failed
            res.status(400).send('reCAPTCHA verification failed.');
        }
    } catch (error) {
        res.status(500).send('Server error.');
    }
});

// Start the Express server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
