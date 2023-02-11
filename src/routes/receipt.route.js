const { Router } = require('express')
const router = Router()
const { createReceipt, getAllReceipt, getReceipt } = require('../controllers/receipt.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post('/create', verifyToken, createReceipt)
router.get('/all', verifyToken, getAllReceipt)
router.get('/get/:id', verifyToken, getReceipt)

module.exports = router
