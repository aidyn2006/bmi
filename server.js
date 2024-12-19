const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/calculate-bmi", (req, res) => {
    console.log("Request body:", req.body); // Debugging
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    console.log("Weight:", weight, "Height:", height); // Debugging

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        res.send(`
            <h1>Invalid Input</h1>
            <p>Please enter positive numbers for weight and height.</p>
            <a href="/">Go back</a>
        `);
        return;
    }

    const bmi = weight / (height * height);
    let category = "";

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 24.9) {
        category = "Normal weight";
    } else if (bmi < 29.9) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    res.send(`
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
            <h1>Your BMI is ${bmi.toFixed(2)}</h1>
            <p style="font-size: 20px; color: ${category === 'Normal weight' ? 'green' : category === 'Overweight' ? 'yellow' : 'red'}">Category: ${category}</p>
            <a href="/" style="text-decoration: none; color: blue;">Calculate Again</a>
        </div>
    `);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
