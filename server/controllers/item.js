const Item = require('../models').Item
const { deleteImageS3 } = require('../config/aws')

module.exports = {
	createItem: async (req, res) => {
		const { name, description, price, section, categories, restaurant_id } = req.body
		const upload_url = req.file ? req.file.location : '/images/item_placeholder.png'

		try {
			let newItem = await Item.create({
				name,
				description,
				price,
				section,
				imageUrl: upload_url,
				categories: categories.split(',').map((x) => x.trim()),
				restaurant_id,
			})
			return res.status(201).json({
				message: 'Item created successfully',
				newItem: newItem,
			})
		} catch (err) {
			return res.status(500).json({ Error: err })
		}
	},

	updateItem: async (req, res) => {
		const id = req.params.id
		const { name, description, price, section, imageUrl, categories } = req.body
		const upload_url = req.file ? req.file.location : imageUrl

		try {
			const item = await Item.findOne({
				where: { id: id },
			})
			if (item) {
				if (upload_url !== imageUrl) {
					deleteImageS3(item)
				}
				item.update({
					name,
					description,
					price,
					section,
					imageUrl: upload_url,
					categories: categories.split(',').map((x) => x.trim()),
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
			const items = await Item.findAll({
				attributes: [
					'id',
					'name',
					'description',
					'price',
					'section',
					'imageUrl',
					'categories',
					'restaurant_id',
				],
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
		const restaurant_id = req.params.id
		try {
			const items = await Item.findAll({
				attributes: [
					'id',
					'name',
					'description',
					'price',
					'section',
					'imageUrl',
					'categories',
					'restaurant_id',
				],
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
		const id = req.params.id
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
		const id = req.params.id
		try {
			let item = await Item.findOne({ where: { id: id } })
			if (item) {
				if (item.imageUrl) {
					deleteImageS3(item)
				}
				item.destroy()
				return res.status(200).json({
					message: 'Item successfully deleted',
					item,
				})
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},
}
