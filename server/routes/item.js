const express = require('express')
const router = express.Router()
const {
    createItem,
    getAllItems,
    getItemsRestaurant,
    deleteItem
} = require('../controllers/item')

router.post('/items',
    createItem
)

router.get('/items',
    getAllItems
)
router.get('/:id/items',
    getItemsRestaurant
)

router.delete('/items/:id',
    deleteItem
)

module.exports = router