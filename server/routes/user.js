const express = require('express')
const router = express.Router()
const {
	signUp,
	signIn,
	updateUser,
	getAllUsers,
	getSingleUser,
	deleteSingleUser,
	deleteAllUsers,
} = require('../controllers/user')

router.post('/sign-up', signUp)

router.post('/sign-in', signIn)

router.patch('/users/:id', updateUser)

router.get('/sign-up/', getAllUsers)

router.get('/sign-up/:id', getSingleUser)

router.delete('/sign-up/:id', deleteSingleUser)

router.delete('/sign-up/', deleteAllUsers)

module.exports = router
