import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import RestaurantContext from '../../context/RestaurantContext'
import LoadingSpinner from '../LoadingSpinner'
import './ItemsTable.css'

function MenuData() {
	let navigate = useNavigate()
	const { items, setItem, getMenuData, deleteMenuItem } = useContext(RestaurantContext)

	useEffect(() => {
		getMenuData()
	}, [getMenuData])

	function handleAddNewItem() {
		setItem(null)
		navigate('/dashboard/add-item')
	}

	function handleDelete(id) {
		alert('Are you sure you want to delete this item from your menu?')
		deleteMenuItem(id)
	}

	function handleEdit(id) {
		if (items) {
			setItem(items.find((item) => item.id === id))
		}
		navigate(`/dashboard/edit-item/${id}`)
	}

	if (!items) {
		return <LoadingSpinner />
	}

	return (
		<div className="my-3">
			<div className="flex justify-end my-2">
				<button
					onClick={handleAddNewItem}
					className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded-xl inline-flex items-center"
				>
					<div className="flex">
						<img height="24px" width="24px" src="/images/icons/add_btn.svg" alt="" />
						<span>Add New Item</span>
					</div>
				</button>
			</div>
			<table className="table-auto mx-auto">
				<thead className="bg-gray-600 text-white">
					<tr>
						<th>Item Image</th>
						<th>Section</th>
						<th>Item Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Categories</th>
						<th>Delete</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, index) => (
						<tr key={index}>
							<td>
								<img height="150px" width="150px" src={item.imageUrl} alt="" />
							</td>
							<td>{item.section}</td>
							<td>{item.name}</td>
							<td className="break-normal">{item.description}</td>
							<td>{item.price}</td>
							<td>
								{item.categories.map((cat, index) => (
									<p key={index}>{cat}</p>
								))}
							</td>
							<td className="text-center">
								<button onClick={() => handleDelete(item.id)}>
									<img height="16px" width="16px" src="/images/icons/delete_btn.svg" alt="" />
								</button>
							</td>
							<td className="text-center">
								<button onClick={() => handleEdit(item.id)}>
									<img height="16px" width="16px" src="/images/icons/edit_btn.svg" alt="" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default MenuData
