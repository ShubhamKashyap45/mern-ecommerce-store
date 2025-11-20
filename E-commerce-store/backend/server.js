import express from "express"
const app = express();

import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
    console.log("Welcome to Home Page");
    res.send("Welcome to Home Page")
    
})
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    connectDB();
})