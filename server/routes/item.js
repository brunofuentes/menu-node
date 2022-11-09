const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerConfig = require('../config/multer')

const { createItem, updateItem, getAllItems, getItemsRestaurant, deleteItem, getItem } = require('../controllers/item')

router.post('/items', multer(multerConfig).single('file'), createItem)

router.patch('/items/:id', multer(multerConfig).single('file'), updateItem)

router.get('/items', getAllItems)

router.get('/items/:id', getItem)

router.get('/:id/items', getItemsRestaurant)

router.delete('/items/:id', deleteItem)

module.exports = router
