const express = require("express")
const router = express.Router()
const {
    createApparetment,
    updateApparetment,
    getApparetments,
    getApparetment,
    deleteAppartement,
    getFloors,
} = require("../controllers/appartementController")
const { validate } = require("../middlewares/inputValidator")
const { getOneAppartement } = require("../middlewares/appartement")
const { authChecker } = require("../middlewares/auth")

router.get("/floors", authChecker, getFloors)
router.post("/", authChecker, validate("appaform"), createApparetment)
router.get("/:appa_id", authChecker, getApparetment)
router.put("/:appa_id", authChecker, validate("appaform"), updateApparetment)
router.get("/", authChecker, getApparetments)
router.delete("/:appa_id", authChecker, deleteAppartement)

router.param("appa_id", getOneAppartement)

module.exports = router
