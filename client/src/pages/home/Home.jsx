import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'

function Home() {
	return (
		<>
			<div className="my-10 flex flex-col items-center justify-center">
				<h1 className="font-bold text-3xl">Bem vindo ao Menu Online!</h1>
				<div className="px-3 text-center my-10">
					<p>
						O menu online é uma aplicação web para restaurantes criarem e gerenciarem seus próprios
						cardápios digitais.
					</p>
				</div>
				<div className="bg-slate-500 text-white text-center font-medium rounded-2xl p-3 hover:bg-slate-400 transition-color duration-200 transform hover:scale-110">
					<div className="p-1">Cardápio de Exemplo</div>
					<img width={200} height={200} src="/images/pacoda-veronese-vercel.png" alt="" />
				</div>
			</div>
		</>
	)
}

export default Home
