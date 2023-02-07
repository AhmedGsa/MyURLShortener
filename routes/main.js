const express = require("express");
const router = express.Router();
const visitUrl = require("../controllers/visitUrl")

router.route("/").get((req,res) => {
    res.render("home.ejs");
});
router.route("/:shortId").get(visitUrl);

module.exports = router