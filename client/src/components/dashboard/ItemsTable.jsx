import React from 'react'
import { useNavigate } from 'react-router'
import './ItemsTable.css'

function MenuData(props) {
	let navigate = useNavigate()
	const { items, onDeleteItem } = props

	function handleAddNewItem() {
		navigate('/dashboard/add-item')
	}

	function handleDelete(id) {
		const confirmed = window.confirm('Are you sure you want to delete this item from your menu?')
		if (confirmed) {
			onDeleteItem(id)
		}
	}

	function handleEdit(id) {
		navigate(`/dashboard/edit-item/${id}`)
	}

	return (
		<div className="my-3">
			<div className="flex justify-end my-3">
				<button
					onClick={handleAddNewItem}
					className="mx-1 bg-gray-800 rounded-lg p-2 hover:bg-gray-500 shadow-md transition ease-out duration-300"
				>
					<div className="flex">
						<img height="24px" width="24px" className="invert" src="/images/icons/add_btn.svg" alt="" />
						<span className="px-1 text-white">Adicionar item</span>
					</div>
				</button>
			</div>
			<div className="overflow-auto h-[75vh] shadow-md">
				<table className="table-auto mx-auto p-1">
					<thead className="bg-gray-800 text-white">
						<tr>
							<th className="whitespace-nowrap">Foto do Item</th>
							<th className="p-3">Secção</th>
							<th className="p-3">Nome do Item</th>
							<th className="p-3">Descrição do Item</th>
							<th className="p-3">Preço (R$)</th>
							<th className="p-3">Detalhes</th>
							<th className="p-3">Editar</th>
							<th className="p-3">Deletar</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr key={item.id}>
								<td>
									<img
										key={item.imageUrl}
										height="36"
										width="60"
										className="flex flex-none"
										src={item.imageUrl}
										alt=""
									/>
								</td>
								<td>{item.section}</td>
								<td>{item.name}</td>
								<td className="break-normal">{item.description}</td>
								<td>{item.price}</td>
								<td>
									{item.categories && item.categories.map((cat, index) => <p key={index}>{cat}</p>)}
								</td>
								<td className="text-center">
									<button onClick={() => handleEdit(item.id)}>
										<img height="16px" width="16px" src="/images/icons/edit_btn.svg" alt="" />
									</button>
								</td>
								<td className="text-center">
									<button onClick={() => handleDelete(item.id)}>
										<img height="16px" width="16px" src="/images/icons/delete_btn.svg" alt="" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default MenuData
