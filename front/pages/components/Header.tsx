import { Menu, Group, Container, Transition } from '@mantine/core';
import { useRouter } from 'next/router';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope, FaCodepen, FaYoutube, FaSoundcloud, FaDiscord } from 'react-icons/fa';
import { TbLink } from 'react-icons/tb';
import { useMediaQuery } from '@mantine/hooks';
import classes from './Header.module.css';

interface LinkItem {
  link?: string;
  label?: string | JSX.Element;
  icon?: JSX.Element;
  isDivider?: boolean;
  links?: LinkItem[];
  category?: string;
}

const links: LinkItem[] = [
  { link: '/', label: 'Home' },
  { link: '/about', label: 'About' },
  { link: '/code', label: 'Code' },
  // { link: '/plan', label: 'Plan' },
  {
    link: '#more',
    label: (
      <>
        <TbLink size={18} />
        <ChevronDown size={12} className={classes.chevronIcon} />
      </>
    ),
    links: [
      { category: 'Contact', link: 'mailto:jayrich.dev@gmail.com', label: 'Email', icon: <FaEnvelope size={12} /> },
      { category: 'Contact', link: 'https://discord.com', label: 'Discord', icon: <FaDiscord size={12} /> },
      { category: 'Contact', link: 'https://www.linkedin.com/in/jaydenrichardson', label: 'LinkedIn', icon: <FaLinkedin size={12} /> },
      { isDivider: true },
      { category: 'Development', link: 'https://codepen.io/JayRichh', label: 'CodePen', icon: <FaCodepen size={12} /> },
      { category: 'Development', link: 'https://github.com/JayRichh', label: 'GitHub', icon: <FaGithub size={12} /> },
      { isDivider: true },
      { category: 'Creative', link: 'https://www.youtube.com', label: 'YouTube', icon: <FaYoutube size={12} /> },
      { category: 'Creative', link: 'https://www.soundcloud.com', label: 'SoundCloud', icon: <FaSoundcloud size={12} /> },
    ],
  },
];

export function Header() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const isHome = router.pathname !== '/';

  const items = links.map((link, index) => {
    if (link.links) {
      const menuItems = [] as JSX.Element[];
      let currentCategory = '';

      link.links.forEach((item, itemIndex) => {
        if (item.isDivider) {
          menuItems.push(<Menu.Divider key={`divider-${itemIndex}`} />);
        } else {
          if (item.category !== currentCategory) {
            currentCategory = item.category || '';
            menuItems.push(<Menu.Label key={`label-${currentCategory}`} style={{ marginTop: 0, marginBottom: 0, paddingLeft: 15 }}>{currentCategory}</Menu.Label>);
          }
          menuItems.push(
            <Menu.Item key={`${item.link}-${itemIndex}`} className={classes.dropdownItem}>
              <Link href={item.link || '#'} passHref legacyBehavior>
                <a className={classes.dropdownLink}>
                  {item.icon}
                  {item.label}
                </a>
              </Link>
            </Menu.Item>
          );
        }
      });

      return (
        <Menu key={`${link.label}-${index}`} trigger="hover" transitionProps={{ transition: 'scale-y', duration: 200 }} position="bottom-end" offset={10}>
          <Menu.Target>
            <button className={`${classes.button} ${classes.moreButton}`}>{link.label}</button>
          </Menu.Target>
          <Menu.Dropdown className={classes.dropdown}>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    } else {
      if (isMobile && link.link === '/plan') {
        return null;
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
            <Link href={link.link || '#'} passHref legacyBehavior style={styles}>
              <button className={classes.button}>{link.label}</button>
            </Link>
          )}
        </Transition>
      );
    }
  });

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
  );
}

export default Header;
