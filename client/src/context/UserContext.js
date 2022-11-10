import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

export function UserProvider({ children }) {
	const navigate = useNavigate()

	let userLS = {
		token: sessionStorage.getItem('token'),
		id: sessionStorage.getItem('id'),
		email: sessionStorage.getItem('email'),
		username: sessionStorage.getItem('username'),
		firstName: sessionStorage.getItem('firstName'),
		lastName: sessionStorage.getItem('lastName'),
		restaurant_id: sessionStorage.getItem('restaurant_id'),
	}

	const [user, setUser] = useState(null)
	const [isLogged, setIsLogged] = useState(false)
	const [showSidebar, setShowSidebar] = useState(true)

	const SaveUserInfo = (user_data) => {
		sessionStorage.setItem('token', user_data.token)
		sessionStorage.setItem('id', user_data.user.id)
		sessionStorage.setItem('email', user_data.user.email)
		sessionStorage.setItem('username', user_data.user.username)
		sessionStorage.setItem('firstName', user_data.user.firstName)
		sessionStorage.setItem('lastName', user_data.user.lastName)
		sessionStorage.setItem('restaurant_id', user_data.user.restaurant_id)
	}

	const LoginUser = (data) => {
		fetch(`/api/sign-in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json()
				}
				throw res
			})
			.then((data) => {
				if (data.success) {
					SaveUserInfo(data)
					setUser(data.user)
					navigate('/dashboard')
				}
				return { message: data.message }
			})
			.catch((err) => {
				console.log(err)
				navigate('/login')
			})
	}

	const logoutUser = () => {
		sessionStorage.clear()
		setIsLogged(() => false)
	}

	const AuthenticateUser = () => {
		const token = sessionStorage.getItem('token')

		useEffect(() => {
			fetch(`/api/protected`, {
				method: 'GET',
				headers: {
					Authorization: token,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						setIsLogged(true)
						setUser(data.user)
					}
				})
				.catch((err) => {
					setIsLogged(false)
					sessionStorage.clear()
					navigate('/login')
					console.error('Error: ' + err)
				})
		}, [token])
	}

	const UpdateUser = (data) => {
		fetch(`/api/users/${data.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				username: data.username,
				restaurant_id: data.restaurant_id,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json()
				}
				throw res
			})
			.then((data) => {
				if (data.success) {
					SaveUserInfo(data)
				}
				return { message: data.message }
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<UserContext.Provider
			value={{
				isLogged,
				user,
				setUser,
				SaveUserInfo,
				logoutUser,
				showSidebar,
				setShowSidebar,
				AuthenticateUser,
				LoginUser,
				UpdateUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
