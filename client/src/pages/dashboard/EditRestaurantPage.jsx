import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EditRestaurantForm from '../../components/dashboard/EditRestaurantForm'
import LoadingSpinner from '../../components/LoadingSpinner'
import UserContext from '../../context/UserContext'
import api from '../../services/api'
import useGetRestaurantData from '../../data/use-get-rest-data'

function EditRestaurantPage() {
	const navigate = useNavigate()

	const { user } = useContext(UserContext)
	const { restaurant } = useGetRestaurantData(user?.restaurant_id)

	function handleUpdateRestaurant(restId, formData) {
		api.updateRestaurantData(restId, formData).then(() => {
			navigate('/dashboard/restaurant')
		})
	}

	function handleCreateRestaurant(user, formData) {
		api.createRestaurant(user, formData).then(() => {
			navigate('/dashboard/restaurant')
		})
	}

	if (!user) return <LoadingSpinner />
	if (!user?.restaurant_id)
		return (
			<div>
				<h1>Cadastrar restaurante:</h1>
				<EditRestaurantForm user={user} onCreateRestaurant={handleCreateRestaurant} />
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
			<EditRestaurantForm
				restaurant={restaurant}
				restId={user?.restaurant_id}
				onRestaurantUpdate={handleUpdateRestaurant}
			/>
		</div>
	)
}

export default EditRestaurantPage
