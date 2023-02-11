const { Router } = require('express')
const router = Router()
const { createReceipt, getAllReceipt, getReceipt, updateReceipt, deleteReceipt } = require('../controllers/receipt.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post('/create', verifyToken, createReceipt)
router.get('/all', verifyToken, getAllReceipt)
router.get('/get/:id', verifyToken, getReceipt)
router.put('/update/:id', verifyToken, updateReceipt)
router.delete('/delete/:id', verifyToken, deleteReceipt)

module.exports = router
