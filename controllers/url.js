require("dotenv").config();
const {StatusCodes} = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const validUrl = require("valid-url");
const shortid = require("shortid");
const Url = require("../models/Url");
const QRCode = require("qrcode");
const path = require("path");

const generateQRCode = async (shortId) => {
    if(!shortId) {
        throw new BadRequestError("Please provide the shortId!");
    }
    try {
        await QRCode.toFile(`./QRCodes/${shortId}.png`, `${process.env.Base_URL}/${shortId}`, {
        errorCorrectionLevel: "H"
    })
    } catch (error) {
        console.log(error);
    }
}

const getQRImage = async (req,res) => {
    const {shortId} = req.params;
    if(!shortId) {
        throw new BadRequestError("Please provide the shortId!")
    }
    const url = await Url.findOne({shortId});
    if(!url) {
        throw new BadRequestError("Wanted Image doesn't exist!")
    }
    res.sendFile(path.join("C:/Users/asus/Desktop/WebProjects/MyUrlShortener", `/QRCodes/${shortId}.png`), err => {
        if(err) {
            console.log(err);
        }
    })
}

const createShortenUrl = async (req,res) => {
    const {longUrl} = req.body;
    if(!longUrl || !validUrl.isUri(longUrl)) {
        throw new BadRequestError("Wrong url format!");
    }
    try {
        let url = await Url.findOne({longUrl});
        if(url) {
            generateQRCode(url.shortId);
            return res.status(StatusCodes.OK).json(url);
        } else {
            const shortId = shortid.generate();
            const shortUrl = process.env.Base_URL + "/" + shortId;
            url = await Url.create({longUrl, shortUrl, shortId});
            generateQRCode(shortId);
            return res.status(StatusCodes.CREATED).json(url);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {createShortenUrl, getQRImage}