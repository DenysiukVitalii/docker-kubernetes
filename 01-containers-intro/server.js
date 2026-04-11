require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT;

// Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
