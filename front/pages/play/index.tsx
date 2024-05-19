import { Container, Title, Text, Button, Group } from '@mantine/core'
import { useRouter } from 'next/router'

export default function ComingSoon() {
	const router = useRouter()
	const goToCode = (): void => {
		router.push('/code')
	}

	return (
		<Container
			style={{
				maxWidth: '500px',
				padding: '20px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}
		>
			<Title style={{ fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }}>Coming Soon</Title>
			<Text style={{ fontSize: '18px', color: '#6B7280', textAlign: 'center' }}>
				This minigame is under development. <br></br>Check back later for more games!
			</Text>
			<Group style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<Button onClick={goToCode} size="md" style={{ marginTop: '20px' }}>
					Check out other Projects here
				</Button>
			</Group>
		</Container>
	)
}
