const { Router } = require('express')
const router = Router()
const { createReceipt, getAllReceipt, getReceipt } = require('../controllers/receipt.controller')

router.post('/create', createReceipt)
router.get('/all/:createdBy', getAllReceipt)
router.get('/get/:id', getReceipt)

module.exports = router
