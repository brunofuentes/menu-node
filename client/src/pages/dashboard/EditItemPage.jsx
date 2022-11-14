import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import EditItemForm from '../../components/dashboard/EditItemForm'
import UserContext from '../../context/UserContext'

function EditItemPage() {
	const { user } = useContext(UserContext)

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
			<EditItemForm restId={user.restaurant_id} />
		</div>
	)
}

export default EditItemPage
