const User = require('../models').User
const bcrypt = require('bcrypt')
const passport = require('passport')

module.exports = {
	// create account
	signUp: async (req, res) => {
		let { firstName, lastName, email, username, password, restaurant_id } = req.body
		try {
			const hashedPassword = await bcrypt.hash(password, 10)
			let newUser = await User.create({
				firstName,
				lastName,
				email,
				username,
				password: hashedPassword,
				restaurant_id,
			})
			return res.status(201).json({
				message: 'User created successfully',
				newUser,
			})
		} catch (err) {
			return res.status(500).json({ err })
		}
	},

	signIn: async (req, res) => {
		try {
			let user = await User.findOne({
				where: { email: req.body.email },
			})
			if (!user) {
				return res.status(404).send({
					message: 'User not found',
				})
			}
			if (user) {
				const match = await bcrypt.compare(req.body.password, user.password)
				if (!match) {
					return res.status(403).send({
						message: 'Incorrect email or password.',
					})
				}
				if (match) {
					return res.status(200).send({
						id: user.id,
						username: user.username,
						email: user.email,
					})
				}
			}
		} catch (err) {
			return res.status(500).send({ message: err.message })
		}
	},

	updateUser: async (req, res) => {
		let { firstName, lastName, email, username, restaurant_id } = req.body
		let id = req.params.id
		try {
			let user = await User.findOne({
				where: { id: id },
			})
			if (user) {
				user.update({
					firstName,
					lastName,
					email,
					username,
					restaurant_id,
				})
				return res.status(202).json({
					message: 'User updated successfully',
					user,
				})
			} else {
				return res.status(206).json({
					message: 'User not found',
				})
			}
		} catch (err) {
			return res.status(400).json({
				error: err,
			})
		}
	},

	getAllUsers: async (req, res) => {
		try {
			let users = await User.findAll({
				attributes: ['id', 'firstName', 'lastName', 'email', 'username', 'restaurant_id'],
				limit: 5,
				order: [['id', 'DESC']],
			})
			if (users) {
				return res.status(200).json({ users })
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},

	getSingleUser: async (req, res) => {
		let id = req.params.id
		try {
			let user = await User.findByPk(id)
			if (user) {
				return res.status(200).json({ user })
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},

	deleteSingleUser: async (req, res) => {
		let id = req.params.id
		try {
			let user = await User.destroy({
				where: { id: id },
			})
			if (user) {
				return res.status(200).json({
					message: 'User Deleted successfully',
					user,
				})
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},

	deleteAllUsers: (req, res) => {
		try {
			let users = User.destroy({
				truncate: true,
			})
			if (users) {
				return res.status(200).json({
					success: true,
					message: 'All Users deleted',
				})
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},
}
