import React from 'react'
import { Container, Paper, Title, Text, Button, Grid } from '@mantine/core'
import Link from 'next/link'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'
import { useMediaQuery } from '@mantine/hooks'

const data = [
	{ name: 'TypeScript', value: 48.17 },
	{ name: 'JavaScript', value: 31.26 },
	{ name: 'Vue', value: 8.86 },
	{ name: 'CSS', value: 6.05 },
	{ name: 'HTML', value: 3.57 },
	{ name: 'SCSS', value: 2.1 },
]

const COLORS = ['#A3B1F7', '#FDBBA9', '#C1E5D7', '#F2E1C1', '#F7D6E0', '#B9C0DA']

interface AboutSectionProps {
	title: string
	children: React.ReactNode
}

const AboutSection: React.FC<AboutSectionProps> = ({ title, children }) => (
	<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
		<Title
			order={4}
			style={{
				marginTop: '2rem',
				marginBottom: '1rem',
				fontSize: '1.75rem',
				fontWeight: 400,
				color: '#333',
				lineHeight: '1.2',
				letterSpacing: '0.01em',
			}}
		>
			{title}
		</Title>
		{children}
	</div>
)

const About: React.FC = () => {
	return (
		<Container
			size={1600}
			style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '4rem 2rem',
			}}
		>
			<Paper
				style={{
					width: '100%',
					backgroundColor: 'rgba(255, 255, 255, 0.1)',
					backdropFilter: 'blur(10px)',
					padding: '2rem',
					textAlign: 'center',
					borderRadius: '10px',
					marginBottom: '2rem',
				}}
			>
				<Title
					order={1}
					style={{
						fontSize: '2.5rem',
						color: '#333',
						textAlign: 'center',
						marginBottom: '0.5rem',
						fontWeight: '400',
						lineHeight: '1.2',
						letterSpacing: '0.02em',
					}}
				>
					Hi, I'm Jayden
				</Title>
				<Text size="lg" style={{ color: 'black', textAlign: 'center', fontSize: '1.25rem', margin: '1rem 0' }}>
					Proficient in Industrial Electrical Engineering and Full Stack Web Development.
					<br />
					Building on full stack knowledge | Kiwi based in the UK
				</Text>
			</Paper>
			<Paper
				style={{
					padding: '2rem',
					borderRadius: '10px',
					width: '100%',
					backgroundColor: 'rgba(255, 255, 255, 0.6)',
					backdropFilter: 'blur(10px)',
				}}
			>
				<Grid gutter="md">
					<Grid.Col span={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
						<AboutSection title="Tech">
							<Text>
								I'm currently diving into full-stack web-based game development, focusing on multiplayer experiences
								with integrated physics engines and real-time interactions using WebSockets.
							</Text>
						</AboutSection>
					</Grid.Col>
					<Grid.Col span={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
						<AboutSection title="Distribution">
							<ResponsiveContainer width="100%" height={200}>
								<PieChart>
									<Pie
										data={data}
										cx="50%"
										cy="50%"
										outerRadius={useMediaQuery('(min-width: 1150px)') ? 70 : 50}
										fill="#8884d8"
										dataKey="value"
									>
										{data.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
												onMouseOver={() => {
													document.body.style.cursor = 'pointer'
												}}
												onMouseOut={() => {
													document.body.style.cursor = 'default'
												}}
											/>
										))}
									</Pie>
									<Tooltip
										formatter={(value, name) => [
											`${value}%`,
											name === 'TypeScript' ? `TypeScript\n(Vue 3, React TSX)` : name,
										]}
										labelStyle={{
											fontSize: '12px',
											fontWeight: 'bold',
										}}
										itemStyle={{
											fontSize: '12px',
											fontWeight: 'bold',
										}}
									/>
									<Legend
										align="right"
										verticalAlign="middle"
										layout="vertical"
										wrapperStyle={{ fontSize: '12px', marginRight: '2rem' }}
									/>
								</PieChart>
							</ResponsiveContainer>
						</AboutSection>
					</Grid.Col>
					<Grid.Col span={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
						<AboutSection title="Experience">
							<Text>
								My journey began with learning the foundations from{' '}
								<a
									href="https://www.theodinproject.com/"
									target="_blank"
									rel="noopener noreferrer"
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									<span
										style={{ cursor: 'pointer' }}
										onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
										onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
									>
										The Odin Project
									</span>
								</a>
								. The tech stack I use includes TypeScript, React, Vue, Next.js, and various game-related libraries and
								frameworks.
							</Text>
						</AboutSection>
					</Grid.Col>
				</Grid>
			</Paper>
			<Link href="/" passHref>
				<Button
					variant="outline"
					style={{
						marginTop: '3rem',
						alignSelf: 'center',
						border: '1px solid black',
						color: 'black',
						backgroundColor: 'white',
						fontWeight: '500',
						padding: '0.5rem 1rem',
						transition: 'all 0.15s ease',
					}}
					onMouseOver={(e) => {
						e.currentTarget.style.backgroundColor = 'black'
						e.currentTarget.style.color = 'white'
						e.currentTarget.style.transform = 'translateY(-2px)'
						e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
					}}
					onMouseOut={(e) => {
						e.currentTarget.style.backgroundColor = 'white'
						e.currentTarget.style.color = 'black'
						e.currentTarget.style.transform = 'translateY(0)'
						e.currentTarget.style.boxShadow = 'none'
					}}
				>
					View Projects
				</Button>
			</Link>
		</Container>
	)
}

export default About
