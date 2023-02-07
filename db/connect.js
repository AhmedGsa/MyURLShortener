const mongoose = require("mongoose");7
mongoose.set("strictQuery", false);

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;