const mongoose = require("mongoose")

const urlSchema = mongoose.Schema({
    shortUrl: {
        type: String,
        required: [true, "Please provide short Url"]
    },
    longUrl: {
        type: String,
        required: [true, "Please provide long Url"]
    },
    shortId: {
        type: String,
        required: [true, "Please provide the short id"]
    }
});

module.exports = mongoose.model("Url", urlSchema);