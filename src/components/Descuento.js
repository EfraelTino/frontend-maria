import React from 'react'
import { Link } from 'react-router-dom'

export default function Descuento() {
  return (
    <div className="p-6 py-12 bg-[#e9d5ff] dark:text-gray-900">
	<div className="container mx-auto">
		<div className="flex flex-col lg:flex-row items-center justify-between">
			<h2 className="text-center text-6xl tracking-tighter font-bold font-montserrat">Aprovecha
				<br className="sm:hidden" /> 50% descuento
			</h2>
			<Link to={'/products'} rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-white text-black hover:bg-sky-700 dark:border-gray-400 no-underline font-montserrat font-medium">Compra Ahora</Link>
		</div>
	</div>
</div>
  )
}
