import React from 'react'

function Home() {
	return (
		<>
			<div className="my-10 flex flex-col items-center justify-center">
				<h1 className="font-bold text-3xl">Bem vindo ao Menu Online!</h1>
				<div className="my-5">
					<p>O menu online é uma aplicação web para restaurantes criarem e gerenciarem seus próprios cardápios digitais.</p>
				</div>
				<a
					href="/padoca-veronese/menu"
					className="bg-slate-500 text-white font-medium rounded-2xl p-3 hover:bg-slate-400 transition-color duration-200 transform hover:scale-110"
				>
					Cardápio de Exemplo
				</a>
			</div>
		</>
	)
}

export default Home
