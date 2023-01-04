const express = require('express')
const router = express.Router()
const { createApparetment, updateApparetment, getApparetments, getApparetment, deleteAppartement } = require('../controllers/appartementCobtroller')
const { validate } = require('../middlewares/inputValidator')
const { getOneAppartement } = require('../middlewares/appartement')

router.post('/', validate('appaform'), createApparetment)
router.get('/:appa_id', getApparetment)
router.put('/', validate('appaform'), updateApparetment)
router.get('/', getApparetments)
router.delete('/:appa_id', deleteAppartement)

router.param('appa_id', getOneAppartement)

module.exports = router