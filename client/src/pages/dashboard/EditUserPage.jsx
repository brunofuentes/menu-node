import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import EditUserForm from '../../components/dashboard/EditUserForm'
import UserContext from '../../context/UserContext'

function EditUserPage() {
	const { user } = useContext(UserContext)
	return (
		<div>
			<Link className="inline-block font-medium" to="/dashboard/account">
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
			<EditUserForm user={user} />
		</div>
	)
}

export default EditUserPage
