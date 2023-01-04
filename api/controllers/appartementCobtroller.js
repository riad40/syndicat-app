const Apparetement = require('../models/Appartement')
const Floor = require('../models/Floor')

const createApparetment = async (req, res, next) => {

    const { appartementOwner, appartementNumber, floorNumber } = req.body

    const errors = validationResult(req)
    
    try {

        // check for request body
        if (!errors.isEmpty()) return next({ status: 400, error: true, message: errors.array() })

        // get the floor number 
        const floorId = Floor.findOne({ floorNumber })

        // create new record
        const appartement = new Apparetement({ 
            appartementNumber, appartementOwner, 
            floorNumber: floorId._id
        })
        await appartement.save()
        
        res.json(200, { message: 'New Apparetement Created Succefully', appartement })

    } catch (error) {
        next({ status: 400, error: true, message: error })
    }
    
} 

const updateApparetment = async (req, res, next) => {

    const { appartementOwner, appartementNumber, floorNumber } = req.body

    const errors = validationResult(req)
    
    try {

        // check for request body
        if (!errors.isEmpty()) return next({ status: 400, error: true, message: errors.array() })

        // get the floor number 
        const floorId = Floor.findOne({ floorNumber })

        // update existing record
        const appartement = Apparetement.updateMany({ _id: req.appartement._id }, { $set: { appartementOwner, appartementNumber, floorNumber: floorId._id } })
        await appartement.save()
        
        res.json(200, { message: 'Apparetement Updated Succefully', appartement })

    } catch (error) {
        next({ status: 400, error: true, message: error })
    }
    
} 

const getApparetment = async (req, res) => {
    res.json(200, { data: req.appartement })
} 

const getApparetments = async (req, res, next) => {

    Apparetement.find()
        .then((data) => {
            res.json(200, { data } )
        }).catch((err) => {
            next({ status: 400, error: true, message: err })
        })
} 

const deleteAppartement = async (req, res, next) => {

    Apparetement.destroy( { where: { _id: req.appartement._id }  
    }).then(() => {
        res.json(200, { message: 'Apparetement Removed Succefully' })
    }).catch((err) => {
        next({ status: 400, error: true, message: err })
    })
    
} 

module.exports = { createApparetment, updateApparetment, getApparetments, getApparetment, deleteAppartement }