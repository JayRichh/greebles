import React, { useRef, useState } from 'react'
import { Button, Badge, Transition } from '@mantine/core'
import { FaFilter, FaTimes } from 'react-icons/fa'
import { DiTerminal } from 'react-icons/di'
import { useClickOutside } from '@mantine/hooks'
import { techIcons } from '../projectData'

interface TechFilterBadgesProps {
	selectedTech: string[]
	handleTechFilter: (tech: string) => void
}

const TechFilterBadges: React.FC<TechFilterBadgesProps> = ({ selectedTech, handleTechFilter }) => {
	const mainTechnologies = [
		'Vue.js',
		'TypeScript',
		'Node.js',
		'React',
		'Next.js',
		'Three.js',
		'CSS Framework',
		'Physics Engine',
		'AI',
	]

	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useClickOutside(() => setIsOpen(false), null, [dropdownRef.current, buttonRef.current])

	const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		event.stopPropagation()
		setIsOpen((prev) => !prev)
	}

	return (
		<div style={{ position: 'relative', zIndex: 40404, margin: '-1.8rem 0 1rem 0', background: 'transparent' }}>
			<Button
				leftSection={<FaFilter size={14} />}
				ref={buttonRef}
				onClick={toggleDropdown}
				size="xs"
				variant="outline"
				style={{
					color: 'black',
					backgroundColor: 'rgba(255, 255, 255, 0.8)',
					border: '1px solid rgba(255, 255, 255, 0.5)',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
					transition: 'all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
					transformOrigin: 'center',
					fontSize: '0.87rem',
					borderRadius: '0.375rem',
					display: 'flex',
					alignItems: 'center',
				}}
				onMouseOver={(e) => {
					e.currentTarget.style.backgroundColor = 'black'
					e.currentTarget.style.color = 'white'
				}}
				onMouseOut={(e) => {
					e.currentTarget.style.backgroundColor = 'transparent'
					e.currentTarget.style.color = 'black'
				}}
			>
				Filter
			</Button>

			<Transition mounted={isOpen} transition="slide-up" duration={200} timingFunction="cubic-bezier(0.4, 0, 0.2, 1)">
				{(styles) => (
					<div
						ref={dropdownRef}
						style={{
							...styles,
							position: 'absolute',
							top: '-55%',
							left: '0.5rem',
							margin: '0 -5rem 0 5rem',
							maxWidth: '70%',
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'flex-start',
							padding: '5px',
							zIndex: 1000,
							background: 'transparent',
						}}
						onClick={(e) => e.stopPropagation()}
					>
						{mainTechnologies.map((tech) => {
							const isSelected = selectedTech.includes(tech)
							const techInfo = techIcons[tech]
							if (!techInfo) {
								console.warn(`No specific icon found for technology: ${tech}. Using default icon.`)
								return (
									<Badge
										key={tech}
										color={isSelected ? 'dark' : 'gray'}
										style={{
											margin: '2px',
											padding: '10px',
											borderRadius: '5px',
											fontSize: '0.9rem',
											cursor: 'pointer',
											position: 'relative',
											boxShadow: isSelected ? '0 4px 6px rgba(0, 0, 0, 0.3)' : 'none',
											transform: isSelected ? 'translateY(-4px)' : 'none',
											transition: 'all 0.15s ease',
											backgroundColor: isSelected ? '#1a202c' : '#e2e8f0',
											color: isSelected ? '#fff' : '#1a202c',
										}}
										leftSection={<DiTerminal size={14} />}
										rightSection={isSelected && <FaTimes size={12} style={{ marginLeft: '5px' }} />}
										onClick={(event) => {
											event.stopPropagation()
											handleTechFilter(tech)
										}}
									>
										{tech}
									</Badge>
								)
							}
							const { icon: Icon, color } = techInfo
							return (
								<Badge
									key={tech}
									color={isSelected ? 'blue' : color}
									style={{
										margin: '2px',
										padding: '10px',
										borderRadius: '5px',
										fontSize: '0.9rem',
										cursor: 'pointer',
										position: 'relative',
										boxShadow: isSelected ? '0 4px 6px rgba(0, 0, 0, 0.3)' : 'none',
										transform: isSelected ? 'translateY(-4px)' : 'none',
										transition: 'all 0.15s ease',
									}}
									leftSection={Icon && <Icon size={14} />}
									rightSection={isSelected && <FaTimes size={12} style={{ marginLeft: '5px' }} />}
									onClick={(event) => {
										event.stopPropagation()
										handleTechFilter(tech)
									}}
								>
									{tech}
								</Badge>
							)
						})}
					</div>
				)}
			</Transition>
		</div>
	)
}

export default TechFilterBadges
