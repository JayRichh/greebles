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
  title="Jayden Richardson | Portfolio"
  description="Explore Jayden Richardson's portfolio featuring a diverse range of projects including web development, interactive features, and mini-games."
  canonical="https://www.jayrichhportfolio.com"
  openGraph={{
    url: 'https://www.jayrichhportfolio.com',
    title: 'Jayden Richardson | Portfolio',
    description: 'Discover the innovative projects by Jayden Richardson, including web applications, interactive designs, and fun mini-games.',
    images: [
      {
        url: '/chat1.png',
        width: 800,
        height: 600,
        alt: 'OpenAI API Chat',
        type: 'image/png',
      },
      {
        url: '/afbuddy3.png',
        width: 1200,
        height: 630,
        alt: 'Chrome Extension',
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
    handle: '@jayrichh',
    site: '@jayrichh',
    cardType: 'summary_large_image',
  }}
  additionalMetaTags={[
    {
      name: 'keywords',
      content: 'Jayden Richardson, software developer, interactive portfolio, web development, game development, tech innovations'
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge; chrome=1'
    },
    {
      name: 'author',
      content: 'Jayden Richardson'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      name: 'theme-color',
      content: '#317EFB'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    },
    {
      name: 'description',
      content: 'Jayden Richardson’s official portfolio showcasing a wide range of projects in web development, game development, and interactive design.'
    }
  ]}
/>
			{CurrentComponent ? <CurrentComponent /> : <p>Loading...</p>}
		</div>
	)
}
