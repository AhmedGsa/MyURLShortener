const express = require("express");
const router = express.Router();
const {createShortenUrl, getQRImage} = require("../controllers/url")

router.route("/").post(createShortenUrl)
router.route("/image/:shortId").get(getQRImage)

module.exports = router