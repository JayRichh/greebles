import React from 'react'
import { Container, Text, Paper, Button, Group, Title, ScrollArea } from '@mantine/core'
import Link from 'next/link'
import ProjectsGrid from './components/projectCards'
import { FaGithub } from 'react-icons/fa'
import { useMediaQuery } from '@mantine/hooks'

const StyledText = (props: { children: React.ReactNode }) => (
	<Text
		style={{
			fontSize: '1.1rem',
			textAlign: 'start',
			fontWeight: '400',
			lineHeight: '1.6',
			marginBottom: '1.5rem',
		}}
	>
		{props.children}
	</Text>
)

const Projects = () => {
	return (
		<ScrollArea scrollbarSize={12} scrollHideDelay={500} type="scroll" offsetScrollbars>
			<Container
				size="xl"
				style={{
					maxWidth: '1200px',
					minWidth: useMediaQuery('(max-width: 768px)') ? '100vw' : 'auto',
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					padding: '60px 0 0 0',
				}}
			>
				<Paper
					shadow="md"
					style={{
						padding: useMediaQuery('(max-width: 768px)')? '2rem' : '2.5rem',
						paddingTop: '0',
						borderRadius: '12px',
						width: 'auto',
						margin: !useMediaQuery('(max-width: 768px)')? '2rem 2rem 0 2rem' : '2rem 0 0 0',
						backgroundColor: 'rgba(255, 255, 255, 0.8)',
						border: '1px solid rgba(0, 0, 0, 0.1)',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
					}}
				>
					<Title
						order={2}
						style={{
							marginBottom: '2rem',
							marginTop: '1rem',
							fontWeight: '400',
							fontSize: '2.5rem',
							lineHeight: '1.2',
							textAlign: 'left',
							letterSpacing: '0.02em',
						}}
					>
						Projects
					</Title>
					<StyledText>
						Experienced in full-stack web development, specializing in TypeScript with Vue, React, and Node.js.
						Experienced with: TSQL, TypeScript, JavaScript, Vue, React, HTML, CSS, Node.js.
					</StyledText>

					<StyledText>
						Explore a selection of my projects below. Feel free to check out my GitHub profile for more details.
					</StyledText>

					<Group style={{ margin: '1rem 0', display: 'flex', justifyContent: 'flex-end' }}>
						<Link href="https://github.com/JayRichh" passHref>
							<Button
								size="md"
								style={{
									backgroundColor: 'black',
									color: 'white',
									fontWeight: '500',
									padding: '0.5rem 1rem',
									transition: 'all 0.15s ease',
									display: 'flex',
									alignItems: 'center',
									border: '1px solid black',
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.backgroundColor = 'white'
									e.currentTarget.style.color = 'black'
									e.currentTarget.style.transform = 'translateY(-2px)'
									e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.backgroundColor = 'black'
									e.currentTarget.style.color = 'white'
									e.currentTarget.style.transform = 'translateY(0)'
									e.currentTarget.style.boxShadow = 'none'
								}}
							>
								<FaGithub size={20} style={{ marginRight: '0.5rem' }} />
								View GitHub
							</Button>
						</Link>
					</Group>
				</Paper>
				<ProjectsGrid />
			</Container>
		</ScrollArea>
	)
}

export default Projects
