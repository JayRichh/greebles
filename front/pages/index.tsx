import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Hero from './components/Hero'
import Projects from './code'
import About from './about'
import NotFound from './404'
import { ThreeCanvas } from '../lib/smol/text'

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
			{CurrentComponent ? <CurrentComponent /> : <p>Loading...</p>}
		</div>
	)
}
