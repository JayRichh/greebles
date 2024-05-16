import React from 'react'

import { ChatListComponent } from '@shared/component/ChatComponent'
import { useEffect, useRef } from 'react'

export interface GameHudProps {
	chatList: ChatListComponent | undefined
	sendMessage: (message: string) => void
}

export default function GameHud({ chatList, sendMessage }: GameHudProps) {
	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		if (messagesEndRef.current) (messagesEndRef.current as any).scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [chatList?.list])

	return (
		<div className="fixed inset-0 p-4 z-50" style={{ pointerEvents: 'none' }}>
			<div className="flex justify-between items-start">
				<div className="flex flex-col space-y-2">
					<div className="text-white">
						<p>Health</p>
						<div className="w-48 bg-gray-700 rounded-full overflow-hidden">
							<div className="h-4 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
						</div>
					</div>
					<div className="text-white">
						<p>Score</p>
						<p className="text-lg">12345</p>
					</div>
				</div>
				<div className="text-white">
					<p>Time</p>
					<p className="text-lg">12:34</p>
				</div>
			</div>
			<div className="absolute left-4 bottom-20 bg-gray-800 bg-opacity-50 p-3 rounded-lg w-1/3">
				<p className="text-white text-xs mb-2">Party Group</p>
				<div className="flex flex-col space-y-1">
					{['Player One', 'Player Two', 'Player Three'].map((name, index) => (
						<div key={index} className="flex justify-between items-center text-white text-sm">
							<p>{name}</p>
							<p>Score: {Math.floor(Math.random() * 10000)}</p>
						</div>
					))}
				</div>
			</div>
			<div
				className="absolute bottom-4 left-1/2 
       transform -translate-x-1/2"
				style={{ pointerEvents: 'auto' }}
			>
				<div className="flex justify-center space-x-2">
					{Array.from({ length: 8 }, (_, i) => i + 1).map((index) => (
						<button key={index} className="bg-gray-700 p-2 rounded-md px-4 bg-opacity-50">
							<p className="text-white">{index}</p>
						</button>
					))}
				</div>
			</div>
			<div className="absolute bottom-4 right-4 bg-black bg-opacity-20 rounded-xl p-4 z-50 hidden md:block w-[360px] pointer-events-auto">
				<div className="overflow-y-auto overflow-hidden max-h-full h-64">
					{chatList?.list.map((message, index) => {
						return (
							<div key={index} className="flex items-center mb-2" ref={messagesEndRef}>
								<div className="bg-black bg-opacity-20 rounded-lg p-2">
									<p className="text-sm">
										<span className="font-medium">{message.message.author} </span>: {message.message.content}
									</p>
								</div>
							</div>
						)
					})}
				</div>
				<input
					type="text"
					placeholder="Type your message..."
					className="p-4 bg-gray-600 bg-opacity-20 text-white w-full rounded-xl"
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === 'Enter') {
							sendMessage(e.currentTarget.value)
							e.currentTarget.value = ''
						}
					}}
				/>
			</div>
		</div>
	)
}
