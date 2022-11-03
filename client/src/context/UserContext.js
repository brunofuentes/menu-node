import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

export function UserProvider({ children }) {
	const [user, setUser] = useState(null)
	const [isLogged, setIsLogged] = useState(false)
	const [showSidebar, setShowSidebar] = useState(true)

	let navigate = useNavigate()

	const SaveUserInfo = (user_data) => {
		sessionStorage.setItem('token', user_data.token)
		sessionStorage.setItem('id', user_data.id)
		sessionStorage.setItem('username', user_data.username)
		sessionStorage.setItem('restaurant_id', user_data.restaurant_id)
		setUser(user_data)
	}

	const GetUserStatus = () => {
		const token = sessionStorage.getItem('token')
		useEffect(() => {
			if (token) {
				setIsLogged(true)
			} else {
				setIsLogged(false)
			}
		}, [token])
	}

	const logoutUser = () => {
		sessionStorage.clear()
		setIsLogged(() => false)
	}

	const AuthenticateUser = () => {
		const token = sessionStorage.getItem('token')
		fetch(`/api/protected`, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => res.json())
			.then((data) => navigate('/dashboard'))
			.catch((err) => {
				navigate('/login')
				console.error('Error: ' + err)
			})
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
			.then((res) => res.json())
			.then((user) => {
				if (user.success) {
					SaveUserInfo(user)
					// AuthenticateUser()
					navigate('/dashboard')
				}
				return { message: user.message }
			})
			.catch((err) => {
				console.log(err)
				navigate('/login')
			})
	}

	return (
		<UserContext.Provider
			value={{
				isLogged,
				user,
				SaveUserInfo,
				GetUserStatus,
				logoutUser,
				showSidebar,
				setShowSidebar,
				AuthenticateUser,
				LoginUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
