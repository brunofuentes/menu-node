const express = require('express')
const router = express.Router()
const { createRest, getAllRestaurants, getRestaurantById, getRestaurantbySlug, deleteRestaurant } = require('../controllers/restaurant')

router.post('/restaurants', createRest)

router.get('/restaurants', getAllRestaurants)

router.get('/restaurants/ids/:id', getRestaurantById)

router.get('/restaurants/:slug', getRestaurantbySlug)

router.delete('/restaurants/:id', deleteRestaurant)

// router.put('/sign-up/:id',
//     updateSignUp
// )

// router.get('/sign-up/',
//     getAllUsers
// )

// router.get('/sign-up/:id',
//     getSingleUser
// )

// router.delete('/sign-up/:id',
//     deleteSingleUser
// )

// router.delete('/sign-up/',
//     deleteAllUsers
// )

module.exports = router
