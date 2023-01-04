const Apparetement = require('../models/Appartement')

const getOneAppartement = (req, res, next, appa_id) => {
    Apparetement.findById(appa_id)
        .then(data => {
            req.appartement = data
            next()
        })
        .catch(err => {
            return res.status(404).json({
                error: 'Appartement not found'
            })
        })
}

module.exports = { getOneAppartement }