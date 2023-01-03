const errorHandler = (err, req, res, next) => {
    res
        .status(err.status || 500)
        .send({ 
            error: err.error, 
            status: err.status, 
            message: err.message || "internal server error"
        }
    )
}

module.exports = errorHandler

