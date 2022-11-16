import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EditItemForm from '../../components/dashboard/EditItemForm'
import LoadingSpinner from '../../components/LoadingSpinner'
import UserContext from '../../context/UserContext'
import api from '../../services/api'
import useGetItemsData from '../../data/use-get-items-data'

function EditItemPage() {
	const navigate = useNavigate()
	const { id } = useParams()
	const { user } = useContext(UserContext)

	const { data } = useGetItemsData(user?.restaurant_id)
	const item = data.items.find((item) => String(item.id) === id)

	function handleUpdateItem(itemId, data) {
		api.updateMenuItem(itemId, user.username, data).then(() => {
			navigate('/dashboard/menu')
		})
	}

	function handleCreateItem(data) {
		api.createMenuItem(user, data).then(() => {
			navigate('/dashboard/menu')
		})
	}

	if (!data) return <LoadingSpinner />

	return (
		<div>
			<Link className="inline-block font-medium" to="/dashboard/menu">
				<div className="flex items-center">
					<img
						height="16px"
						width="16px"
						src="/images/icons/chevron_left.svg"
						alt="voltar para página dos items do menu"
					/>
					<span>Voltar</span>
				</div>
			</Link>
			<EditItemForm
				item={item}
				sections={data.sections}
				restId={user?.restaurant_id}
				onCreateItem={handleCreateItem}
				onItemUpdate={handleUpdateItem}
			/>
		</div>
	)
}

export default EditItemPage
