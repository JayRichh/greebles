import { Container, Group, ActionIcon } from '@mantine/core'
import { Github, Youtube, Instagram } from 'lucide-react'
import classes from './Footer.module.css'

export default function FooterSocial() {
	return (
		<div className={`${classes.footer}`}>
			<Container className={classes.inner}>
				<img src="/logo.webp" alt="Logo" className={classes.logo} />
				<Group className={classes.links}>
					<ActionIcon size="lg" color="gray" variant="subtle">
						<Github />
					</ActionIcon>
					<ActionIcon size="lg" color="gray" variant="subtle">
						<Youtube style={{ width: 24, height: 24 }} stroke="1.5" />
					</ActionIcon>
					<ActionIcon size="lg" color="gray" variant="subtle">
						<Instagram style={{ width: 24, height: 24 }} stroke="1.5" />
					</ActionIcon>
				</Group>
			</Container>
		</div>
	)
}
