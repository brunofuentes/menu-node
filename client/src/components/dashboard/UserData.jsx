import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import useGetRestaurantData from '../../data/use-get-rest-data'
import LoadingSpinner from '../LoadingSpinner'

function UserData() {
	const navigate = useNavigate()

	const { user } = useContext(UserContext)
	const { restaurant } = useGetRestaurantData(user?.restaurant_id)

	const handleClickEdit = () => {
		navigate('/dashboard/edit-account')
	}

	if (!user && !restaurant) {
		return <LoadingSpinner />
	}

	return (
		<div className="border max-w-sm rounded relative shadow-md">
			<div className="flex justify-between p-2">
				<span className="text-lg font-semibold p-2">Informações da Conta</span>
				<span className="flex">
					<button onClick={handleClickEdit}>
						<img height="24px" width="24px" src="/images/icons/settings.svg" alt="edit"></img>
					</button>
				</span>
			</div>
			<div className="p-2">
				<ul>
					<li>
						<span className="font-semibold">Nome: </span>
						{user.firstName}
					</li>
					<li>
						<span className="font-semibold">Sobrenome: </span>
						{user.lastName}
					</li>
					<li>
						<span className="font-semibold">Usuário: </span>
						{user.username}
					</li>
					<li>
						<span className="font-semibold">Email: </span>
						{user.email}
					</li>
					<li>
						<span className="font-semibold">Restaurante: </span>
						<span>{restaurant?.name}</span>
					</li>
					<li>
						<span className="font-semibold">Restaurante URL: </span>
						<span>.../{restaurant?.slug}/menu</span>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default UserData
