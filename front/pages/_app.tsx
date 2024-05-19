import '../styles/globals.css'
import '@mantine/core/styles.css'
import { MantineProvider, AppShell, createTheme } from '@mantine/core'
import Header from './components/Header'
// import Footer from './components/Footer'
import type { AppProps } from 'next/app'

const theme = createTheme({
	fontFamily: 'Inter, sans-serif',
	primaryColor: 'blue',
	headings: {
		fontFamily: 'Roboto, sans-serif',
		fontWeight: '700',
	},
	other: {
		fontFamily: 'Inter, sans-serif',
		fontWeight: 400,
		color: 'white',
	},
	spacing: { xs: '1rem', sm: '1.2rem', md: '1.8rem', lg: '2.2rem', xl: '2.8rem' },
	breakpoints: {
		xs: '30em',
		sm: '48em',
		md: '64em',
		lg: '74em',
		xl: '90em',
	},
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider theme={theme}>
			<AppShell
				header={{ height: 60 }}
				className="app-shell"
				styles={(theme) => ({
					root: {
						minWidth: '100vw',
					},
					main: {
						height: '100vh',
						overflow: 'auto',
					},
				})}
			>
				<Header />
				<Component {...pageProps} />
				{/* <Footer /> */}
			</AppShell>
		</MantineProvider>
	)
}
