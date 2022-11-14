const { PRIVATE_KEY } = require('../utils/constants')
const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
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
				success: true,
				message: 'User created successfully',
				newUser: {
					firstName: newUser.firstName,
					lastName: newUser.lastName,
					email: newUser.email,
					username: newUser.username,
					restaurant_id: newUser.restaurant_id,
				},
			})
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: 'Something went wrong',
				error: err,
			})
		}
	},

	signIn: async (req, res) => {
		try {
			let user = await User.findOne({
				where: { email: req.body.email },
			})
			if (!user) {
				return res.status(404).send({
					success: false,
					message: 'User not found',
				})
			}
			if (user) {
				const match = await bcrypt.compare(req.body.password, user.password)
				if (!match) {
					return res.status(403).send({
						success: false,
						message: 'Incorrect email or password.',
					})
				}
				const payload = {
					id: user.id,
					username: user.username,
					email: user.email,
					restaurant_id: user.restaurant_id,
				}

				const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: '1d' })

				return res.status(200).send({
					success: true,
					message: 'Logged in successfully!',
					token: 'Bearer ' + token,
					user: {
						id: user.id,
						username: user.username,
						email: user.email,
						firstName: user.firstName,
						lastName: user.lastName,
						restaurant_id: user.restaurant_id,
					},
				})
			}
		} catch (err) {
			return res.status(500).send({ message: err.message })
		}
	},

	updateUser: async (req, res) => {
		const id = req.params.id
		const { firstName, lastName, email, username, restaurant_id } = req.body

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
					user: {
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.lastEmail,
						username: user.username,
						restaurant_id: user.restaurant_id,
					},
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

	updateUserPassword: async (req, res) => {
		const id = req.params.id
		const { password, newPassword } = req.body
		try {
			let user = await User.findOne({
				where: { id: id },
			})
			if (user) {
				const match = await bcrypt.compare(password, user.password)
				if (!match) {
					return res.status(403).send({
						success: false,
						message: 'Incorrect password.',
					})
				} else if (newPassword === password) {
					return res.status(406).json({
						success: false,
						message: 'New Password must be different than current.',
					})
				} else {
					const hashedNewPassword = await bcrypt.hash(newPassword, 10)
					user.update({
						...user,
						password: hashedNewPassword,
					})
					return res.status(202).json({
						message: 'User password updated successfully',
						user: {
							id: user.id,
							firstName: user.firstName,
							lastName: user.lastName,
							email: user.lastEmail,
							username: user.username,
							restaurant_id: user.restaurant_id,
						},
					})
				}
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
				})
			} else {
				return res.status(404).json({
					message: 'User not found',
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
