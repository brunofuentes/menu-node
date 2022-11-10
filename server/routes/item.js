const express = require('express')
const router = express.Router()
const upload = require('multer')
const multerConfig = require('../config/multer')

const { createItem, updateItem, getAllItems, getItemsRestaurant, deleteItem, getItem } = require('../controllers/item')

router.post('/items', upload(multerConfig).single('file'), createItem)

router.patch('/items/:id', upload(multerConfig).single('file'), updateItem)

router.get('/items', getAllItems)

router.get('/items/:id', getItem)

router.get('/:id/items', getItemsRestaurant)

router.delete('/items/:id', deleteItem)

module.exports = router
