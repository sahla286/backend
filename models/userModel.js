const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
            "Please enter a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be at least 6 characters"],
    },
    role: {
        type: String,
        required: [true],
        default: "customer",
        enum: ["customer", "admin"],
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDK1/avatar.png",
    },
    phone: {
        type: String,
        default: "+91",
    },
    address: {
        type: Object,
    },
});

userSchema.pre("save",async function(next)
{
    if(!this.isModified("password"))
    {
        return next();
    }
    //hash password
    const salt = await bcrypt.hash.genSalt(10)
    const hashedPassword = bcrypt.hash(this.password,salt)
    this.password = hashedPassword
    next();
})
const User = mongoose.model("User", userSchema);
module.exports = User;
