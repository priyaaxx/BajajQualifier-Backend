const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Utility function to validate input data
const validateInputData = (data) => {
    return Array.isArray(data) && data.every(item => typeof item === 'string' || !isNaN(item));
};

// Endpoint for GET request
app.get('/bfhl', (req, res) => {
    try {
        res.status(200).json({ "operation_code": 1 });
    } catch (error) {
        res.status(500).json({ 
            is_success: false, 
            message: 'Internal server error' 
        });
    }
});

// Endpoint for POST request
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Input validation
        if (!data || !validateInputData(data)) {
            return res.status(400).json({
                is_success: false,
                message: 'Invalid input data. Data should be an array of strings or numbers.'
            });
        }

        const numbers = [];
        const alphabets = [];
        let highestLowercaseAlphabet = null;

        // Processing the data
        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (typeof item === 'string') {
                alphabets.push(item);
                if (item === item.toLowerCase()) {
                    if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                        highestLowercaseAlphabet = item;
                    }
                }
            }
        });

        // Successful response
        res.status(200).json({
            is_success: true,
            user_id: "priya_gopal_01042003", // Replace with dynamic logic if needed
            email: "priya.gopal2021@vitbhopal.ac.in",
            roll_number: "21BAI10248",
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
        });

    } catch (error) {
        // General error handling
        res.status(500).json({
            is_success: false,
            message: 'Internal server error'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
