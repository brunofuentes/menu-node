import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import EditRestaurantForm from '../../components/dashboard/EditRestaurantForm'
import LoadingSpinner from '../../components/LoadingSpinner'
import UserContext from '../../context/UserContext'

function EditRestaurantPage() {
	const { user } = useContext(UserContext)

	if (!user) return <LoadingSpinner />
	else if (!user?.restaurant_id)
		return (
			<div>
				<h1>Cadastrar restaurante:</h1>
				<EditRestaurantForm />
			</div>
		)
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
			<EditRestaurantForm restId={user?.restaurant_id} />
		</div>
	)
}

export default EditRestaurantPage
