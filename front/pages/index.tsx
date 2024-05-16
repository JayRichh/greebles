import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Hero from './components/Hero'
import Projects from './code'
import About from './about'
import NotFound from './404'
import { ThreeCanvas } from '../lib/smol/text'
import { NextSeo } from 'next-seo'

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
				title="Portfolio Website with Interactive Elements"
				description="A portfolio website that showcases my projects, skills, and experience through interactive features and a mini-game, demonstrating my abilities in web development and creating engaging user experiences."
				openGraph={{
					title: 'Portfolio Website with Interactive Elements',
					description:
						'A portfolio website that showcases my projects, skills, and experience through interactive features and a mini-game, demonstrating my abilities in web development and creating engaging user experiences.',
					images: [
						{
							url: '/project-img1.png',
							width: 800,
							height: 600,
							alt: 'Portfolio Project Image',
							type: 'image/png',
						},
						{
							url: '/project-img2.png',
							width: 1200,
							height: 630,
							alt: 'Interactive Hero Page',
							type: 'image/png',
						},
						{
							url: '/project-img3.png',
							width: 1200,
							height: 630,
							alt: 'Physics-based Interactions',
							type: 'image/png',
						},
						{
							url: '/project-img4.png',
							width: 1200,
							height: 630,
							alt: 'Multiplayer Mini-Game',
							type: 'image/png',
						},
						{
							url: '/project-img5.png',
							width: 1200,
							height: 630,
							alt: 'Responsive Design',
							type: 'image/png',
						},
					],
					siteName: 'JayRichh Portfolio',
				}}
				twitter={{
					handle: '@JayRichh',
					site: '@JayRichh',
					cardType: 'summary_large_image',
				}}
			/>
			{CurrentComponent ? <CurrentComponent /> : <p>Loading...</p>}
		</div>
	)
}
