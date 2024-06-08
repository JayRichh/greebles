import { Menu, Group, Container, Transition } from '@mantine/core'
import { useRouter } from 'next/router'
import { ChevronDown, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import classes from './Header.module.css'
import { FaGithub, FaTwitter, FaDiscord, FaLinkedin, FaEnvelope, FaCodepen } from 'react-icons/fa'
import { TbLink } from 'react-icons/tb'
import { useMediaQuery } from '@mantine/hooks'
const links = [
	{ link: '/', label: 'Home' },
	{ link: '/about', label: 'About' },
	{ link: '/code', label: 'Code' },
	{ link: '/plan', label: 'Plan' },
	{
		link: '#more',
		label: (
			<>
				<TbLink size={18} />
				<ChevronDown size={12} className={classes.chevronIcon} />
			</>
		),
		links: [
			{ link: 'https://github.com/JayRichh', label: 'GitHub', icon: <FaGithub size={12} /> },
			// { link: 'https://discord.com', label: 'Discord', icon: <FaDiscord size={12} /> },
			{ link: 'https://www.linkedin.com/in/jaydenrichardson', label: 'LinkedIn', icon: <FaLinkedin size={12} /> },
			{ link: 'mailto:jayrich.dev@gmail.com', label: 'Email', icon: <FaEnvelope size={12} /> },
			{ link: 'https://codepen.io/JayRichh', label: 'CodePen', icon: <FaCodepen size={12} /> },
		],
	},
]

export function Header() {
	const isMobile = useMediaQuery('(max-width: 768px)')
	const router = useRouter()
	const isHome = router.pathname !== '/'
	const items = links.map((link, index) => {
		if (link.links) {
			const menuItems = link.links.map((item, itemIndex) => (
				<Menu.Item key={`${item.link}-${itemIndex}`} className={classes.dropdownItem}>
					<Link href={item.link} passHref legacyBehavior>
						<a className={classes.dropdownLink}>
							{item.icon}
							{item.label}
						</a>
					</Link>
				</Menu.Item>
			))

			return (
				<Menu key={`${link.label}-${index}`} trigger="hover">
					<Menu.Target>
						<button className={`${classes.button} ${classes.moreButton}`}>{link.label}</button>
					</Menu.Target>
					<Menu.Dropdown className={classes.dropdown}>{menuItems}</Menu.Dropdown>
				</Menu>
			)
		} else {
			if (isMobile && link.link === '/plan') {
				return null
			}
			return (
				<Transition
					key={`${link.label}-${index}`}
					mounted={link.link !== '/' || isHome}
					transition="fade"
					duration={200}
					timingFunction="ease"
				>
					{(styles) => (
						<Link href={link.link} passHref legacyBehavior style={styles}>
							<button className={classes.button}>{link.label}</button>
						</Link>
					)}
				</Transition>
			)
		}
	})

	return (
		<header className={classes.header}>
			<Container className={classes.inner}>
				<Link href="/" passHref legacyBehavior style={{ cursor: 'pointer' }} className={classes.logoLink}>
					<span className={classes.logo}></span>
					{/* <Image src="/logo.webp" alt="Business" width={60} height={60} className={classes.logo} /> */}
				</Link>
				<Group className={classes.group}>{items}</Group>
			</Container>
		</header>
	)
}

export default Header
