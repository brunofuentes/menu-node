const Item = require('../models').Item

module.exports = {
	createItem: async (req, res) => {
		let { name, description, price, section, imageUrl, categories, restaurant_id } = req.body
		try {
			let newItem = await Item.create({
				name,
				description,
				price,
				section,
				imageUrl,
				categories,
				restaurant_id,
			})
			return res.status(201).json({
				message: 'Item created successfully',
				newItem,
			})
		} catch (err) {
			return res.status(500).json({ Error: err })
		}
	},

	updateItem: async (req, res) => {
		let { name, description, price, section, imageUrl, categories, restaurant_id } = req.body
		let id = req.params.id
		try {
			let item = await Item.findOne({
				where: { id: id },
			})
			if (item) {
				item.update({
					name,
					description,
					price,
					section,
					imageUrl,
					categories,
				})
				return res.status(202).json({
					message: 'Item updated successfully',
					item,
				})
			} else {
				return res.status(206).json({
					message: 'Item not found',
				})
			}
		} catch (err) {
			return res.status(400).json({
				Error: err,
			})
		}
	},

	getAllItems: async (req, res) => {
		try {
			let items = await Item.findAll({
				attributes: ['id', 'name', 'description', 'price', 'section', 'imageUrl', 'categories', 'restaurant_id'],
				limit: 100,
				order: [['section', 'DESC']],
			})
			if (items) {
				return res.status(200).json({ items })
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},

	getItemsRestaurant: async (req, res) => {
		let restaurant_id = req.params.id
		try {
			let items = await Item.findAll({
				attributes: ['id', 'name', 'description', 'price', 'section', 'imageUrl', 'categories', 'restaurant_id'],
				where: { restaurant_id: restaurant_id },
				limit: 100,
				order: [['section', 'DESC']],
			})
			if (items) {
				return res.status(200).json({ items })
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},

	getItem: async (req, res) => {
		let id = req.params.id
		try {
			let item = await Item.findByPk(id)
			if (item) {
				return res.status(200).json({ item })
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},

	deleteItem: async (req, res) => {
		let id = req.params.id
		try {
			let item = await Item.destroy({
				where: { id: id },
			})
			if (item) {
				return res.status(200).json({
					message: 'Restaurant Deleted successfully',
					item,
				})
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},
}
