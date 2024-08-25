const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Redirect root URL to /bfhl
app.get('/', (req, res) => {
    res.redirect('/bfhl');
});

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

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: 'Invalid input data'
            });
        }

        const numbers = [];
        const alphabets = [];
        let highestLowercaseAlphabet = null;

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

        res.status(200).json({
            is_success: true,
            user_id: "priya_gopal_01042003",
            email: "priya.gopal2021@vitbhopal.ac.in",
            roll_number: "21BAI10248",
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
        });

    } catch (error) {
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
