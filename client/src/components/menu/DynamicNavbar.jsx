import React, { useRef, useState, useEffect } from 'react'

const useHeadingsData = () => {
	const [nestedHeadings, setNestedHeadings] = useState([])

	useEffect(() => {
		const elements = document.querySelectorAll('h2')
		const headings = Array.from(elements).map((heading) => {
			return {
				id: heading.id,
				title: heading.innerText,
			}
		})

		setNestedHeadings(headings)
	}, [])

	return { nestedHeadings }
}

const useIntersectionObserver = (setActiveId) => {
	const headingElementsRef = useRef({})

	useEffect(() => {
		const callback = (headings) => {
			headingElementsRef.current = headings.reduce((map, headingElement) => {
				map[headingElement.target.id] = headingElement
				return map
			}, headingElementsRef.current)

			const visibleHeadings = []
			Object.keys(headingElementsRef.current).forEach((key) => {
				const headingElement = headingElementsRef.current[key]
				if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
			})

			const getIndexFromId = (id) => headingElements.findIndex((heading) => heading.id === id)

			if (visibleHeadings.length === 1) {
				setActiveId(visibleHeadings[0].target.id)
			} else if (visibleHeadings.length > 1) {
				const sortedVisibleHeadings = visibleHeadings.sort((a, b) =>
					getIndexFromId(a.target.id) > getIndexFromId(b.target.id) ? 1 : -1
				)
				setActiveId(sortedVisibleHeadings[0].target.id)
			}
		}

		const observer = new IntersectionObserver(callback, {
			rootMargin: '0px 0px -40% 0px',
		})

		const headingElements = Array.from(document.querySelectorAll('h2'))
		headingElements.forEach((element) => observer.observe(element))

		return () => observer.disconnect()
	}, [setActiveId])
}

const DynamicNavbar = () => {
	const [activeId, setActiveId] = useState()
	const { nestedHeadings } = useHeadingsData()

	useIntersectionObserver(setActiveId)

	return (
		<div className="overflow-x-auto scrollbar-hide sticky top-0 mx-auto bg-gray-200 py-2">
			<nav className="mx-auto flex max-w-2xl gap-3 px-2">
				{nestedHeadings.map((heading) => {
					const activeClasses = heading.id === activeId ? 'bg-black text-white' : ''
					return (
						<button
							key={heading.title}
							className={`rounded-full border border-black py-1 px-4 text-sm ${activeClasses}`}
							onClick={() => {
								document.querySelector(`#${heading.id}`).scrollIntoView({
									behavior: 'smooth',
								})
							}}
						>
							{heading.title}
						</button>
					)
				})}
			</nav>
		</div>
	)
}

export default DynamicNavbar
