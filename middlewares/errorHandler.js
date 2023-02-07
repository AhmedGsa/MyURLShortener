const CustomAPIError = require("../errors/custom-error");
const {StatusCodes} = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");

const errorHandlerMiddleware = (err,req,res,next) => {
    if(err instanceof CustomAPIError) {
        if(err instanceof NotFoundError) {
            res.render("error", {msg: err.message, status: err.statusCode});
        } else {
            res.status(err.statusCode).json(err.message);
        }
        
    } else {
        res.render("error", {
            msg: "Internal Server Error",
            status: 500
        });
    }
}

module.exports = errorHandlerMiddleware;