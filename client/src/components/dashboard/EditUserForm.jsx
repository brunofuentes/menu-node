import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import './EditUserForm.css'

function EditUserForm({ user }) {
	const navigate = useNavigate()
	const { UpdateUser, UpdateUserPassword } = useContext(UserContext)

	const {
		register: regPersonalData,
		handleSubmit: SubmitPersonalData,
		formState: { errors: errPersonalData },
	} = useForm()

	const {
		register: regPassword,
		handleSubmit: SubmitPassword,
		formState: { errors: errPassword },
	} = useForm()

	const onSubmitPersonalData = (data) => {
		const userData = { ...data, id: user.id }
		UpdateUser(userData)
		navigate('/dashboard/account')
	}

	const onSubmitPassword = (data) => {
		const userData = { ...data, id: user.id }
		if (data.newPassword !== data.confirmNewPassword) {
			alert("passwords doesn't match")
		} else {
			UpdateUserPassword(userData)
		}
	}

	return (
		<div className="max-w-md w-full mx-auto bg-white p-2">
			<form key={1} action="" className="space-y-6" onSubmit={SubmitPersonalData(onSubmitPersonalData)}>
				<div>
					<label htmlFor="" className="text-sm font-bold text-gray-600 block">
						Nome
					</label>
					<input
						{...regPersonalData('firstName', { required: true })}
						type="text"
						defaultValue={user?.firstName}
						style={{ borderColor: errPersonalData.firstName ? 'red' : '' }}
						className="border-gray-300 rounded w-full p-2 border mt-1"
					></input>
					{errPersonalData.firstName && <span className="text-sm">Esse campo é obrigatório</span>}
				</div>
				<div>
					<label htmlFor="" className="text-sm font-bold text-gray-600 block">
						Sobrenome
					</label>
					<input
						{...regPersonalData('lastName', { required: true })}
						type="text"
						defaultValue={user?.lastName}
						style={{ borderColor: errPersonalData.lastName ? 'red' : '' }}
						className="border-gray-300 rounded w-full p-2 border mt-1"
					></input>
					{errPersonalData.lastName && <span className="text-sm">Esse campo é obrigatório</span>}
				</div>
				<div>
					<button
						type="submit"
						className=" w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
					>
						Atualizar dados
					</button>
				</div>
			</form>
			<form key={2} action="" className="space-y-6" onSubmit={SubmitPassword(onSubmitPassword)}>
				<h2 className="mt-2">Trocar senha</h2>
				<div>
					<label htmlFor="" className="text-sm font-bold text-gray-600 block">
						Senha atual
					</label>
					<input
						{...regPassword('password', { required: true })}
						type="password"
						style={{ borderColor: errPassword.password ? 'red' : '' }}
						className="border-gray-300 rounded w-full p-2 border mt-1"
					></input>
					{errPassword.password && <span className="text-sm">Esse campo é obrigatório</span>}
				</div>
				<div>
					<label htmlFor="" className="text-sm font-bold text-gray-600 block">
						<div className="hoverEffect flex items-center">
							Nova senha
							<img
								height="24"
								width="24"
								className="inline pl-1"
								src="/images/icons/info_icon.svg"
								alt="Password info"
							/>
						</div>
						<div className="hide text-sm font-normal text-red-500 relative max-w-sm">
							A senha deve ter:
							<li>Mínimo 4 caracteres</li>
							<li>Pelo menos uma letra maiúscula e uma minúscula</li>
							<li>Pelo menos um caracter numérico</li>
						</div>
					</label>
					<input
						{...regPassword('newPassword', {
							required: true,
							pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/gm,
						})}
						type="password"
						style={{ borderColor: errPassword.newPassword ? 'red' : '' }}
						className="border-gray-300 rounded w-full p-2 border mt-1"
					></input>
					{errPassword.newPassword ? (
						errPassword?.newPassword?.type === 'pattern' ? (
							<span className="text-sm">Observe os critérios mínimos para a senha</span>
						) : (
							<span className="text-sm">Esse campo é obrigatório</span>
						)
					) : (
						<span></span>
					)}
				</div>
				<div>
					<label htmlFor="" className="text-sm font-bold text-gray-600 block">
						Confirme nova senha
					</label>
					<input
						{...regPassword('confirmNewPassword', { required: true })}
						type="password"
						style={{ borderColor: errPassword.password ? 'red' : '' }}
						className="border-gray-300 rounded w-full p-2 border mt-1"
					></input>
					{errPassword.password && <span className="text-sm">Esse campo é obrigatório</span>}
				</div>
				<div>
					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
					>
						Atualizar senha
					</button>
				</div>
			</form>
		</div>
	)
}

export default EditUserForm
