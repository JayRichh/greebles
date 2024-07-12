import React from 'react'
import '@mantine/core/styles.css'
import { MantineProvider, Text, Paper, Container, Grid, Box, ThemeIcon } from '@mantine/core'
import { FaCodeBranch, FaCode, FaComments, FaTools } from 'react-icons/fa'
import { GiElectric } from 'react-icons/gi'
import { useMediaQuery } from '@mantine/hooks'

const handleIconMouseOver = (e: any) => {
	const target = e.currentTarget
	target.style.transition = 'background-color 0.3s ease, color 0.3s ease'
	target.style.backgroundColor = 'white'
	target.style.color = 'black'
	target.style.transformOrigin = 'center'
}

const handleIconMouseOut = (e: any) => {
	const target = e.currentTarget
	target.style.transition = 'background-color 0.3s ease, color 0.3s ease'
	target.style.backgroundColor = 'black'
	target.style.color = 'white'
	target.style.transformOrigin = 'center'
}

const handleCardMouseOver = (e: any) => {
	const target = e.currentTarget
	target.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'
	target.style.transform = 'scale(1.02)'
	target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
	target.style.transformOrigin = 'center'
}

const handleCardMouseOut = (e: any) => {
	const target = e.currentTarget
	target.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'
	target.style.transform = 'scale(1)'
	target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
	target.style.transformOrigin = 'center'
}

const handleIconClick = (e: any) => {
	const target = e.currentTarget
	target.style.transition = 'transform 0.1s ease'
	target.style.transform = 'scale(0.95)'
	target.style.transformOrigin = 'center'
	setTimeout(() => {
		target.style.transform = 'scale(1)'
	}, 100)
}

const Timeline = () => {
	const timelineItems = [
		{
			year: '2022 - Present',
			content: 'Software Developer at Omega 365',
			date: 'December 2022 - Present',
			description:
				'Developing software solutions using modern web technologies. Enhancing project and operations management tools, ensuring high-quality, user-centric software. Collaborating with cross-functional teams to deliver robust applications.',
			icon: <FaCode size={24} />,
		},
		{
			year: '2022',
			content: 'Web Developer at The Odin Project',
			date: 'April 2022 - December 2022',
			description:
				'Focused on full-stack web development using HTML, CSS, JavaScript, and the MERN stack. Built comprehensive applications, leveraging modern web development practices. Completed multiple projects of various scopes, enhancing both front-end and back-end skills.',
			icon: <FaCodeBranch size={24} />,
		},
		{
			year: '2020 - 2022',
			content: 'Estimator at Electrical & Automation Solutions',
			date: 'August 2020 - April 2022',
			description:
				'Quoted, designed, and implemented industrial process control systems. Developed internal methods, sourced new technologies, and maintained client relationships. Led stakeholder engagements through events and meetings to ensure project alignment.',
			icon: <FaComments size={24} />,
		},
		{
			year: '2020',
			content: 'Industrial Electrician at Electrical & Automation Solutions',
			date: 'October 2019 - August 2020',
			description:
				'Managed electrical system installations in the dairy industry. Mentored apprentices, installed motors and lighting systems, and calibrated monitoring equipment. Ensured compliance with engineering regulations, laws, and guidelines.',
			icon: <FaTools size={24} />,
		},
		{
			year: '2019',
			content: 'Electrical Apprentice at Hennessy Electrical',
			date: 'May 2018 - October 2019',
			description:
				'Achieved instrumentation training and certification. Conducted preventive maintenance for various industries, improving processes and gaining expertise in industrial environments. Assisted in the development of maintenance plans to enhance operational efficiency.',
			icon: <GiElectric size={24} />,
		},
		{
			year: '2013 - 2018',
			content: 'Fire Systems Engineer at Select Alarms',
			date: 'January 2013 - May 2018',
			description:
				'Trained apprentices and managed multiple projects. Installed and maintained fire detection systems in commercial and industrial facilities, adhering to NZ building codes. Responded to fault call-outs and executed preventative maintenance plans.',
			icon: <FaCodeBranch size={24} />,
		},
	]
	const isSmall = useMediaQuery('(max-width: 700px)')

	return (
		<MantineProvider>
			<Box style={{ position: 'relative' }}>
				<Box
					style={{
						position: 'absolute',
						top: 0,
						height: '100%',
						bottom: 0,
						left: '50%',
						width: '2px',
						backgroundColor: '#E9ECEF',
						transform: 'translateX(-50%)',
					}}
				/>
				<Grid>
					{timelineItems.map((item, index) => {
						const isRight = index % 2 === 0
						return (
							<Grid.Col key={index} span={12} style={{ position: 'relative', marginBottom: isSmall ? '40px' : '0' }}>
								<Box
									style={{
										display: 'flex',
										justifyContent: isRight ? 'flex-end' : 'flex-start',
										position: 'relative',
									}}
								>
									<Paper
										shadow="md"
										p="md"
										style={{
											maxWidth: isSmall ? '100%' : '45%',
											backgroundColor: '#f8f9fa',
											border: '1px solid #dee2e6',
											transition: 'transform 0.3s ease, box-shadow 0.3s ease',
										}}
										onMouseOver={handleCardMouseOver}
										onMouseOut={handleCardMouseOut}
									>
										<Text style={{ fontWeight: 'bold' }} size="sm" mb="xs">
											{item.content}
										</Text>
										<Text size="sm" color="dimmed" mb="xs">
											{item.date}
										</Text>
										<Text size="sm">{item.description}</Text>
									</Paper>
									<Box
										hidden={isSmall}
										style={{
											position: 'absolute',
											top: 0,
											left: '50%',
											transform: 'translateX(-50%)',
											cursor: 'pointer',
											backgroundColor: 'black',
											color: 'white',
											transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
											borderRadius: '50%',
										}}
									>
										<ThemeIcon
											onMouseOver={handleIconMouseOver}
											onMouseOut={handleIconMouseOut}
											onClick={handleIconClick}
											size="lg"
											radius="xl"
											color="blue"
											style={{
												backgroundColor: 'inherit',
												color: 'inherit',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												width: '40px',
												height: '40px',
												borderRadius: '50%',
												boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)',
												cursor: 'pointer',
												transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
											}}
										>
											{item.icon}
										</ThemeIcon>
									</Box>
								</Box>
								<Text
									size="sm"
									style={{
										position: 'absolute',
										fontWeight: 'bold',
										top: '-20px',
										left: '50%',
										transform: 'translateX(-50%)',
										backgroundColor: '#fff',
										padding: '0 8px',
										fontSize: '1.25rem',
										color: '#000',
										borderRadius: '10px',
										boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)',
									}}
								>
									{item.year}
								</Text>
							</Grid.Col>
						)
					})}
				</Grid>
			</Box>
		</MantineProvider>
	)
}

export default Timeline
