import React from 'react'

interface LoadingScreenProps {
	message?: string
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Connecting to server...' }) => {
	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-25 flex items-center justify-center">
			<div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 max-w-sm w-full mx-auto space-y-6 animate-pulse">
				<div className="text-lg font-semibold">Loading...</div>
				<p className="text-gray-700 text-sm">{message}</p>
				<div className="space-y-3">
					<div className="bg-gray-300 h-2 rounded animate-pulse"></div>
					<div className="grid grid-cols-3 gap-4">
						<div className="h-2 bg-gray-300 rounded col-span-2 animate-pulse"></div>
						<div className="h-2 bg-gray-300 rounded col-span-1 animate-pulse"></div>
					</div>
					<button
						type="button"
						className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2 rounded-md shadow focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors"
					>
						Please wait...
					</button>
				</div>
			</div>
		</div>
	)
}

export default LoadingScreen
