const express = require('express')
const router = express.Router()
const { createItem, updateItem, getAllItems, getItemsRestaurant, deleteItem, getItem } = require('../controllers/item')

router.post('/items', createItem)

router.patch('/items/:id', updateItem)

router.get('/items', getAllItems)

router.get('/items/:id', getItem)

router.get('/:id/items', getItemsRestaurant)

router.delete('/items/:id', deleteItem)

module.exports = router
