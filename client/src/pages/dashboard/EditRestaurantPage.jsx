import React from 'react'
import { Link } from 'react-router-dom'
import EditRestaurantForm from '../../components/dashboard/EditRestaurantForm'

function EditRestaurantPage() {
	return (
		<div>
			<Link className="inline-block font-medium" to="/dashboard/restaurant">
				<div className="flex items-center">
					<img
						height="16px"
						width="16px"
						src="/images/icons/chevron_left.svg"
						alt="voltar para página do Restaurante"
					/>
					<span>Voltar</span>
				</div>
			</Link>
			<EditRestaurantForm />
		</div>
	)
}

export default EditRestaurantPage
