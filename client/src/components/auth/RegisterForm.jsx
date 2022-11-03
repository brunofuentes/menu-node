import { useForm } from 'react-hook-form'

function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		if (data.password !== data.confirm_password) {
			alert("Password doesn't match!")
		} else {
			fetch('/api/sign-up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: data.username,
					email: data.email,
					password: data.password,
				}),
			})
				.then((res) => {
					res.json()
					if (!res.ok) {
						alert(res.statusText)
					} else {
						alert('Account created')
					}
				})
				.catch((err) => alert('error, ', err))
		}
	}

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 justify-center p-3">
			<div className="max-w-md w-full mx-auto">
				<div className="text-3xl font-bold text-gray-900 mt-2 text-center">Crie uma conta</div>
			</div>
			<div className="max-w-md w-full mx-auto mt-4 bg-white p-8 rounded border border-gray-300">
				<form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-6">
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Usuário
						</label>
						<input
							{...register('username', {
								required: true,
								minLength: 5,
								maxLength: 100,
							})}
							style={{ borderColor: errors.username ? 'red' : '' }}
							type="text"
							className="w-full p-2 border border-gray-300 rounded mt-1"
						></input>
						{errors.username && <span>Usuário é obrigatório!</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Email
						</label>
						<input
							{...register('email', {
								required: true,
								minLength: 6,
								maxLength: 100,
							})}
							style={{ borderColor: errors.email ? 'red' : '' }}
							type="text"
							className="w-full p-2 border border-gray-300 rounded mt-1"
						></input>
						{errors.email && <span>Email inválido</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Senha
						</label>
						<input
							{...register('password', { required: true })}
							style={{
								borderColor: errors.password ? 'red' : '',
							}}
							type="password"
							className="w-full p-2 border border-gray-300 rounded mt-1"
						></input>
						{errors.password && <span>Senha Inválida</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Confirmar senha
						</label>
						<input
							{...register('confirm_password', { required: true })}
							style={{
								borderColor: errors.password ? 'red' : '',
							}}
							type="password"
							className="w-full p-2 border border-gray-300 rounded mt-1"
						></input>
						{errors.password && <span>Senha Inválida</span>}
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input type="checkbox" className="h-4 w-4 text-blue-300 rounded"></input>
							<label htmlFor="" className="ml-2 text-sm text-gray-600">
								Aceitar termos e condições
							</label>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
						>
							Registrar
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RegisterForm
