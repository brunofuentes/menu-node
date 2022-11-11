import React from 'react'
import { useContext } from 'react'
import LoginForm from '../../components/auth/LoginForm'
import LoadingSpinner from '../../components/LoadingSpinner'
import UserContext from '../../context/UserContext'

function LoginPage() {
	const { isLoading } = useContext(UserContext)

	if (isLoading) return <LoadingSpinner />
	return (
		<div>
			<LoginForm />
		</div>
	)
}

export default LoginPage
