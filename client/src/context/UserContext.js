import { createContext, useState, useEffect } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
	const [user, setUser] = useState(null)
	const [isLogged, setIsLogged] = useState(false)

	const saveUserInfo = (user_data) => {
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

	return (
		<UserContext.Provider value={{ isLogged, user, saveUserInfo, GetUserStatus, logoutUser }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
