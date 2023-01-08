const Apparetement = require("../models/Appartement")
const Floor = require("../models/Floor")

const getOneAppartement = (req, res, next, appa_id) => {
    Apparetement.findById(appa_id)
        .populate("floorNumber")
        .then((data) => {
            req.appartement = data
            next()
        })
        .catch((err) => {
            console.log(err)
            return res.status(404).json({
                error: "Appartement not found",
            })
        })
}

module.exports = { getOneAppartement }
