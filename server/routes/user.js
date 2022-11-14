const express = require('express')
const router = express.Router()
const {
	signUp,
	signIn,
	updateUser,
	updateUserPassword,
	getAllUsers,
	getSingleUser,
	deleteSingleUser,
	deleteAllUsers,
} = require('../controllers/user')

router.post('/sign-up', signUp)

router.post('/sign-in', signIn)

router.patch('/users/:id', updateUser)

router.patch('/users/password/:id', updateUserPassword)

router.get('/users/', getAllUsers)

router.get('/users/:id', getSingleUser)

router.delete('/users/:id', deleteSingleUser)

router.delete('/sign-up/', deleteAllUsers)

module.exports = router
