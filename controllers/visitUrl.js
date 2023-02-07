const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const Url = require("../models/Url");


const visitUrl = async (req,res) => {
    const {shortId} = req.params;
    const url = await Url.findOne({shortId});
    if(!url) {
        throw new NotFoundError("Url doesn't Exist")
    }
    res.redirect(url.longUrl);
}

module.exports = visitUrl