import React from 'react'
import {
	Modal,
	Transition,
	ScrollArea,
	Image,
	Title,
	Text,
	Grid,
	Divider,
	Skeleton,
	Container,
	useMantineTheme,
} from '@mantine/core'
import { Project } from './projectData'
import { ChallengeDetail, LearningDetail } from './projectData'

interface ProjectModalProps {
	project: Project
	opened: boolean
	onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, opened, onClose }) => {
	const theme = useMantineTheme()

	const formatDescription = (text: string) =>
		text.split('\n\n').map((paragraph, idx) => <Text key={idx}>{paragraph.trim()}</Text>)

	const renderSkeleton = () => <Skeleton height={140} radius="md" animate={false} />
	const renderChallengesAndLearnings = (challenges: ChallengeDetail[], learnings: LearningDetail[]) => (
		<Grid>
			{challenges.map((challenge, idx) => (
				<Grid.Col span={6} key={'challenge-' + idx}>
					<Title order={5}>{challenge.title}</Title>
					<Text>{challenge.text}</Text>
					{challenge.image && (
						<Image
							src={challenge.image}
							alt="Challenge detail"
							style={{ width: '100%', borderRadius: '4px', margin: '10px 0' }}
						/>
					)}
				</Grid.Col>
			))}
			{learnings.map((learning, idx) => (
				<Grid.Col span={6} key={'learning-' + idx}>
					<Title order={5}>{learning.title}</Title>
					{learning.points.map((point, pointIdx) => (
						<div key={pointIdx}>
							<Text>{point.text}</Text>
							{point.image && (
								<Image
									src={point.image}
									alt="Learning detail"
									style={{ width: '100%', borderRadius: '4px', margin: '10px 0' }}
								/>
							)}
						</div>
					))}
				</Grid.Col>
			))}
		</Grid>
	)

	return (
		<Transition mounted={opened} transition="fade" duration={400} timingFunction="ease">
			{(styles) => (
				<div style={styles}>
					<Modal
						opened={opened}
						onClose={onClose}
						size="80%"
						centered
						withCloseButton={false}
					>
								<ScrollArea scrollbarSize={12} scrollHideDelay={500} type="scroll" offsetScrollbars>
							<div style={{ padding: '32px', maxWidth: '900px', margin: '0 auto' }}>
								<Grid gutter="md">
									<Grid.Col span={12}>
										<Image
											src={project.imgUrl || 'https://via.placeholder.com/1920x1080'}
											alt={`Screenshot of ${project.title}`}
											style={{ width: '100%', borderRadius: '4px', marginBottom: '20px' }}
										/>
									</Grid.Col>

									{formatDescription(project.details.description)}

									<Grid.Col span={12}>
										<Divider label="Technologies" labelPosition="center" my="sm" />
										<Text>{project.details.technologies.join(', ')}</Text>
									</Grid.Col>

									<Grid.Col span={12}>
										<Divider label="Features and Details" labelPosition="center" my="sm" />
									</Grid.Col>

									<Container my="md">
										<Grid>
											{project.details.features.map((feature, idx) => (
												<React.Fragment key={idx}>
													{idx % 2 === 0 ? (
														<>
															<Grid.Col
																span={{
																	base: 12,
																	xs: feature.image ? 8 : 12,
																	sm: feature.image ? 8 : 12,
																	md: feature.image ? 8 : 12,
																	lg: feature.image ? 8 : 12,
																}}
															>
																<div
																	style={{
																		textAlign: 'left',
																		height: '100%',
																		display: 'flex',
																		flexDirection: 'column',
																		justifyContent: 'center',
																	}}
																>
																	<Title order={4}>{feature.title}</Title>
																	<Text>{feature.text}</Text>
																</div>
															</Grid.Col>
															{feature.image && (
																<Grid.Col
																	span={{
																		base: 12,
																		xs: 4,
																		sm: 4,
																		md: 4,
																		lg: 4,
																	}}
																>
																	<Image
																		src={feature.image}
																		alt="Feature detail"
																		style={{ borderRadius: '4px', width: '100%', height: 'auto' }}
																	/>
																</Grid.Col>
															)}
														</>
													) : (
														<>
															{feature.image && (
																<Grid.Col
																	span={{
																		base: 12,
																		xs: 4,
																		sm: 4,
																		md: 4,
																		lg: 4,
																	}}
																>
																	<Image
																		src={feature.image}
																		alt="Feature detail"
																		style={{ borderRadius: '4px', width: '100%', height: 'auto' }}
																	/>
																</Grid.Col>
															)}
															<Grid.Col
																span={{
																	base: 12,
																	xs: feature.image ? 8 : 12,
																	sm: feature.image ? 8 : 12,
																	md: feature.image ? 8 : 12,
																	lg: feature.image ? 8 : 12,
																}}
															>
																<div
																	style={{
																		textAlign: 'right',
																		height: '100%',
																		display: 'flex',
																		flexDirection: 'column',
																		justifyContent: 'center',
																	}}
																>
																	<Title order={4}>{feature.title}</Title>
																	<Text>{feature.text}</Text>
																</div>
															</Grid.Col>
														</>
													)}
												</React.Fragment>
											))}
										</Grid>
									</Container>

									<Grid.Col span={12}>
										<Divider label="Challenges and Learnings" labelPosition="center" my="sm" />
										{renderChallengesAndLearnings(project.details.challenges, project.details.learnings)}
									</Grid.Col>

									<Grid.Col span={12}>
										<Divider label="Gallery" labelPosition="center" my="sm" />
										<Grid gutter="md">
											{project.details.additionalImages.map((img, idx) => (
												<Grid.Col span={{ base: 12, sm: 4 }} key={idx}>
													<Image
														src={img}
														alt="Additional detail"
														style={{ width: '100%', marginBottom: '20px', borderRadius: '4px' }}
													/>
												</Grid.Col>
											))}
										</Grid>
									</Grid.Col>
								</Grid>
							</div>
						</ScrollArea>
					</Modal>
				</div>
			)}
		</Transition>
	)
}

export default ProjectModal
