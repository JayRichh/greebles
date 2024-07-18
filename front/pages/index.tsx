import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Hero from './components/Hero'
import Projects from './code'
import About from './about'
import NotFound from './404'
import { ThreeCanvas } from '../lib/smol/text'
import { NextSeo } from 'next-seo'
import { Analytics } from "@vercel/analytics/react"

type RouteComponents = {
	[key: string]: React.ComponentType<any>
}

const routeComponents: RouteComponents = {
	'/': Hero,
	'/projects': Projects,
	'/about': About,
	'/contact': About,
}

export default function Home() {
	const [CurrentComponent, setCurrentComponent] = useState<React.ComponentType<any> | null>(null)
	const router = useRouter()

	useEffect(() => {
		const Component = routeComponents[router.pathname] || NotFound
		setCurrentComponent(() => Component)

		return () => {
			if (ThreeCanvas.dispose) {
				ThreeCanvas.dispose()
			}
		}
	}, [router.pathname])

	return (
		<div style={{ height: '100%', width: '100%', padding: '0', margin: '0', overflow: 'auto' }}>
			<NextSeo
				title="Jayden Richardson | Software Developer Portfolio"
				description="Portfolio highlighting personal and collaborative projects with a focus on software development and practical applications."
				canonical="https://greebles.vercel.app/"
				openGraph={{
					url: 'https://greebles.vercel.app/',
					title: 'Jayden Richardson | Software Developer Portfolio',
					description:
						'Detailed view into my software development projects, including web applications and interactive systems.',
					images: [
						{
							url: '/chat1.png',
							width: 800,
							height: 600,
							alt: 'Chat application interface',
							type: 'image/png',
						},
						{
							url: '/afbuddy3.png',
							width: 1200,
							height: 630,
							alt: 'Screenshot of a browser extension',
							type: 'image/png',
						},
						{
							url: '/project-img3.png',
							width: 1200,
							height: 630,
							alt: 'Physics simulation in action',
							type: 'image/png',
						},
						{
							url: '/project-img4.png',
							width: 1200,
							height: 630,
							alt: 'Overview of a multiplayer game project',
							type: 'image/png',
						},
						{
							url: '/project-img5.png',
							width: 1200,
							height: 630,
							alt: 'Example of responsive web design',
							type: 'image/png',
						},
					],
					siteName: 'Jayden Richardson | Portfolio',
				}}
				additionalMetaTags={[
					{
						name: 'keywords',
						content: 'software development, web applications, interactive systems, game development, project portfolio',
					},
					{
						httpEquiv: 'x-ua-compatible',
						content: 'IE=edge; chrome=1',
					},
					{
						name: 'author',
						content: 'Jayden Richardson',
					},
					{
						name: 'robots',
						content: 'index, follow',
					},
					{
						name: 'theme-color',
						content: '#317EFB',
					},
					{
						name: 'viewport',
						content: 'width=device-width, initial-scale=1.0',
					},
					{
						name: 'contact',
						content: 'email: jayrich.dev@gmail.com',
					},
					{
						name: 'linkedin',
						content: 'https://www.linkedin.com/in/jaydenrichardson/',
					},
				]}
			/>
			{CurrentComponent ? <CurrentComponent /> : <p>Loading...</p>}
			<Analytics />
		</div>
	)
}
