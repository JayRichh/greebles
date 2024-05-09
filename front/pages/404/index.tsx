import { Container, Title, Text, Button, Group } from '@mantine/core'
import Illustration from './illustration'
import classes from './illustration.module.css'

export default function NothingFoundBackground() {
	const back = (): void => {
		window.history.back()
	}

	return (
		<Container className={classes.root}>
			<div className={classes.inner}>
				<Illustration className={classes.image} />
				<div className={classes.content}>
					<Title className={classes.title}>err</Title>
					<Text c="dimmed" size="lg" ta="center" className={classes.description}>
						Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to
						another URL.
					</Text>
					<Group justify="center">
						<Button onClick={back} size="md">
							Take me back
						</Button>
					</Group>
				</div>
			</div>
		</Container>
	)
}
