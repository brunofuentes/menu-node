import React, { useContext } from 'react'
import RestaurantContext from '../../context/RestaurantContext'
import UserContext from '../../context/UserContext'
import LoadingSpinner from '../LoadingSpinner'

function UserData() {
	const { user } = useContext(UserContext)
	const { restaurant, GetRestaurantData } = useContext(RestaurantContext)

	GetRestaurantData()

	const handleClickEdit = () => {
		console.log('function not yet implemented')
	}

	if (!user) {
		return <LoadingSpinner />
	}

	return (
		<div className="mx-3 border max-w-sm rounded relative shadow-md">
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
