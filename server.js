const dotenv =  require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");

const app=express()

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(
    cors({
    origin: ["http://localhost:3000","http://craftio.vercel.app"],
    credentials: true,
})
);

//Routes
app.use("/api/users",userRoute);
app.get("/",(req,res) => {
    res.send("Home")
});

//error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000
mongoose.set('strictQuery', false);
mongoose
.connect(process.env.MONGO_URL)
.then (()=>{
    app.listen(PORT,() => {
        console.log(`Server running on port ${PORT}`)
    })
})
.catch((err)=> console.log(err))
