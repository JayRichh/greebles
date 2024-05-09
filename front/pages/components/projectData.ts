import { StaticImageData } from 'next/image'
import { IconType } from 'react-icons'
import {
	DiMongodb,
	DiHtml5,
	DiCss3,
	DiReact,
	DiSass,
	DiJavascript1,
	DiGit,
	DiVisualstudio,
	DiChrome,
	DiFirebase,
} from 'react-icons/di'
import { FaRobot } from 'react-icons/fa'
import {
	SiVuedotjs,
	SiTypescript,
	SiNodedotjs,
	SiExpress,
	SiNextdotjs,
	SiTailwindcss,
	SiThreedotjs,
	SiSocketdotio,
	SiStyledcomponents,
	SiMongodb,
} from 'react-icons/si'

export interface FeatureDetail {
	title: string
	text: string
	image?: string
}

export interface ChallengeDetail {
	title: string
	text: string
	image?: string
}

export interface LearningPoint {
	text: string
	image?: string
}

export interface LearningDetail {
	title: string
	points: LearningPoint[]
}

export interface ProjectDetail {
	title: string
	description: string
	technologies: string[]
	features: FeatureDetail[]
	challenges: ChallengeDetail[]
	learnings: LearningDetail[]
	additionalImages: StaticImageData[] | string[]
}

export interface Project {
	title: string
	description: string
	imgUrl: StaticImageData | string
	repoUrl: string
	liveUrl: string
	details: ProjectDetail
}

export interface TechIcon {
	icon: IconType
	color: string
	docLink: string
}

export interface TechIcons {
	[key: string]: TechIcon
}

export const techIcons: TechIcons = {
	'Vue.js': { icon: SiVuedotjs, color: '#4FC08D', docLink: 'https://vuejs.org' },
	Vue3: { icon: SiVuedotjs, color: '#4FC08D', docLink: 'https://vuejs.org' },
	TypeScript: { icon: SiTypescript, color: '#3178C6', docLink: 'https://www.typescriptlang.org' },
	'Node.js': { icon: SiNodedotjs, color: '#339933', docLink: 'https://nodejs.org' },
	Express: { icon: SiExpress, color: '#000000', docLink: 'https://expressjs.com' },
	MongoDB: { icon: DiMongodb, color: '#47A248', docLink: 'https://www.mongodb.com' },
	HTML5: { icon: DiHtml5, color: '#E34F26', docLink: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5' },
	CSS3: { icon: DiCss3, color: '#1572B6', docLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
	'Next.js': { icon: SiNextdotjs, color: '#000000', docLink: 'https://nextjs.org' },
	React: { icon: DiReact, color: '#61DAFB', docLink: 'https://reactjs.org' },
	'Tailwind CSS': { icon: SiTailwindcss, color: '#38B2AC', docLink: 'https://tailwindcss.com' },
	Sass: { icon: DiSass, color: '#CC6699', docLink: 'https://sass-lang.com' },
	JavaScript: {
		icon: DiJavascript1,
		color: '#F7DF1E',
		docLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
	},
	Git: { icon: DiGit, color: '#F05032', docLink: 'https://git-scm.com' },
	'VS Code': { icon: DiVisualstudio, color: '#007ACC', docLink: 'https://code.visualstudio.com' },
	'Chrome DevTools': { icon: DiChrome, color: '#4285F4', docLink: 'https://developer.chrome.com/docs/devtools/' },
	Firebase: { icon: DiFirebase, color: '#FFCA28', docLink: 'https://firebase.google.com' },
	CSS: { icon: DiCss3, color: '#1572B6', docLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
	Vuex: { icon: SiVuedotjs, color: '#4FC08D', docLink: 'https://vuex.vuejs.org/' },
	Bootstrap: { icon: DiCss3, color: '#1572B6', docLink: 'https://getbootstrap.com' },
	GSAP: { icon: DiJavascript1, color: '#F0DB4F', docLink: 'https://greensock.com/gsap/' },
	'Vue Router': { icon: SiVuedotjs, color: '#4FC08D', docLink: 'https://router.vuejs.org/' },
	HTML: { icon: DiHtml5, color: '#E34F26', docLink: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5' },
	'Three.js': { icon: SiThreedotjs, color: '#000000', docLink: 'https://threejs.org/' },
	WebSockets: {
		icon: SiSocketdotio,
		color: '#010101',
		docLink: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
	},
	'Rapier Physics Engine': { icon: DiJavascript1, color: '#7B7B7B', docLink: 'https://rapier.rs/' },
	'CANNON.js': { icon: DiJavascript1, color: '#7B7B7B', docLink: 'https://schteppe.github.io/cannon.js/' },
	OpenAI: { icon: FaRobot, color: '#7B7B7B', docLink: 'https://openai.com' },
	'Styled-Components': { icon: SiStyledcomponents, color: '#DB7093', docLink: 'https://styled-components.com' },
	Mongoose: { icon: SiMongodb, color: '#47A248', docLink: 'https://mongoosejs.com' },
}

export const projectData: Project[] = [
	{
		title: 'Portfolio with Interactive Hero',
		description:
			'An engaging portfolio website that showcases my projects, skills, and experience through an interactive 3D hero page.',
		imgUrl: '/project-img1.png',
		repoUrl: 'https://github.com/JayRichh/portfolio',
		liveUrl: 'https://jayrichh.com',
		details: {
			title: 'Portfolio',
			description:
				'My personal portfolio website offers an interactive 3D hero page that showcases my projects, skills, and experience. The hero page uses CANNON.js and Three.js to create an immersive and interactive experience.',
			technologies: ['Next.js', 'React', 'Three.js', 'Tailwind CSS', 'TypeScript', 'CANNON.js'],
			features: [
				{
					title: 'Immersive Hero Page with CANNON.js',
					text: 'The hero page of the portfolio website showcases an interactive 3D scene powered by CANNON.js physics engine. Visitors can interact with the dynamic elements, creating an engaging and memorable experience.',
					image: '/project-img2.png',
				},
				{
					title: 'Realistic Physics Simulations',
					text: 'Leveraging the CANNON.js physics engine, the hero page incorporates realistic physics simulations, enabling visitors to interact with objects in a lifelike manner. This adds an extra layer of immersion and interactivity to the website.',
					image: '/project-img3.png',
				},
				{
					title: 'Seamless Three.js Integration',
					text: 'The hero page seamlessly integrates CANNON.js physics with Three.js rendering, creating a visually stunning and physically accurate 3D environment. This combination allows for smooth animations and real-time interactions.',
					image: '/project-img4.png',
				},
				{
					title: 'Modular Scene Management',
					text: 'The SceneManager.ts file demonstrates a modular approach to managing the 3D scene, encapsulating the setup of the camera, lights, and main object group. This clean and organized structure enhances maintainability and extensibility.',
					image: '/project-img5.png',
				},
				{
					title: 'Responsive Design',
					text: 'The hero page adapts to different screen sizes and devices, ensuring an optimal viewing experience for all visitors. The camera and scene elements dynamically adjust to maintain the desired composition and layout.',
					image: '/project-img6.png',
				},
			],
			challenges: [
				{
					title: 'CANNON.js and Three.js Integration',
					text: 'Integrating CANNON.js physics engine with Three.js rendering to create a seamless and interactive 3D experience on the hero page.',
					image: '',
				},
				{
					title: 'Hero Page Performance Optimization',
					text: 'Optimizing the performance of the hero page to ensure smooth interactions and animations, especially on resource-constrained devices.',
					image: '',
				},
			],
			learnings: [
				{
					title: '3D Graphics and Physics Simulations',
					points: [
						{
							text: 'Developed expertise in leveraging Three.js and WebGL to create stunning 3D graphics and immersive environments within a web browser.',
							image: '',
						},
						{
							text: 'Integrated CANNON.js physics engine to simulate realistic physics interactions and collisions, enhancing the interactivity and realism of the 3D scene.',
							image: '',
						},
						{
							text: 'Optimized 3D models, textures, and shaders to achieve optimal performance and smooth rendering across different devices and browsers.',
							image: '/project-img7.png',
						},
					],
				},
			],
			additionalImages: ['/project-img1.png', '/project-img2.png', '/project-img3.png'],
		},
	},
	{
		title: '3D Multiplayer Mini-Game',
		description:
			'An immersive 3D multiplayer mini-game environment where visitors can explore, interact, and engage with others in real-time.',
		imgUrl: '/project-img3.png',
		repoUrl: 'https://github.com/JayRichh/portfolio',
		liveUrl: 'https://jayrichh.com/minigame',
		details: {
			title: '3D Multiplayer Mini-Game',
			description:
				'The mini-game provides an interactive 3D environment powered by the Rapier physics engine, where visitors can interact with elements and other users in real-time.',
			technologies: [
				'Next.js',
				'React',
				'TypeScript',
				'Tailwind CSS',
				'Three.js',
				'WebSockets',
				'Node.js',
				'Rapier Physics Engine',
			],
			features: [
				{
					title: '3D Multiplayer Mini-Game Environment',
					text: 'An immersive 3D mini-game environment where visitors can explore, interact with various elements, and engage with other users in real-time to discover information about my projects, skills, and experience.',
					image: '/project-img4.png',
				},
				{
					title: 'Real-time Networked Multiplayer Experience',
					text: 'Visitors can join a shared virtual world and interact with other users in real-time, thanks to the robust WebSocket-based networking system that ensures seamless synchronization and minimal latency.',
					image: '/project-img5.png',
				},
				{
					title: 'Physics-based Interactions',
					text: 'Realistic physics simulations powered by the Rapier physics engine, enabling dynamic and engaging interactions within the game environment.',
					image: '/project-img6.png',
				},
				{
					title: 'Smooth Performance and Optimization',
					text: 'Careful optimization techniques and efficient resource management to ensure smooth performance across different devices and network conditions.',
					image: '/project-img7.png',
				},
			],
			challenges: [
				{
					title: 'Engaging 3D Mini-Game Design',
					text: 'Designing and implementing an engaging and visually appealing 3D mini-game environment that seamlessly integrates portfolio content.',
					image: '',
				},
				{
					title: 'Performance Optimization for Mini-Game',
					text: 'Optimizing performance and ensuring smooth gameplay experience across different devices and hardware configurations.',
					image: '',
				},
				{
					title: 'Real-time Networking Implementation',
					text: 'Implementing real-time networking and synchronization for multiplayer interactions and shared virtual world experiences.',
					image: '',
				},
				{
					title: 'Balancing Interactivity and Content',
					text: 'Balancing the level of interactivity and gamification with the primary goal of showcasing my projects, skills, and experience effectively.',
					image: '',
				},
			],
			learnings: [
				{
					title: 'Real-time Multiplayer Networking',
					points: [
						{
							text: 'Implemented real-time multiplayer functionality using WebSockets, enabling seamless communication and synchronization between clients and the server.',
							image: '',
						},
						{
							text: 'Designed efficient network protocols and data serialization techniques to minimize latency and ensure smooth gameplay experience for all players.',
							image: '',
						},
						{
							text: 'Handled client-side prediction and server reconciliation to compensate for network delays and maintain a responsive and fair multiplayer environment.',
							image: '',
						},
					],
				},
				{
					title: 'Game Development Best Practices',
					points: [
						{
							text: 'Employed modular and component-based architecture to create a maintainable and extensible codebase for the mini-game.',
							image: '',
						},
						{
							text: 'Implemented efficient game loop and update mechanisms to ensure smooth and consistent gameplay across different frame rates and devices.',
							image: '',
						},
						{
							text: 'Utilized object pooling and resource management techniques to optimize memory usage and minimize garbage collection overhead.',
							image: '',
						},
					],
				},
			],
			additionalImages: ['/project-img1.png', '/project-img2.png', '/project-img3.png'],
		},
	},

	{
		title: 'Off The Floor Website',
		description:
			'A modern and dynamic business website created using Vue3 and TypeScript, featuring responsive design and tailored functionalities to promote aerial arts classes.',
		imgUrl: '/otf1.png',
		repoUrl: 'https://github.com/JayRichh/OffTheFloor',
		liveUrl: '',
		details: {
			title: 'OffTheFloor',
			description:
				'OffTheFloor is a custom business website showcasing services like aerial arts classes and sessions. It integrates advanced web technologies and dynamic content management to deliver a seamless user experience.',
			technologies: ['Vue3', 'TypeScript', 'CSS3', 'HTML5', 'Bootstrap', 'Vue Router'],
			features: [
				{
					title: 'Dynamic Routing with Vue Router',
					text: 'Dynamic routing with Vue Router enabling seamless page transitions and state management without reloading the page.',
					image: '/otf2.png',
				},
				{
					title: 'Responsive Web Design',
					text: 'Responsive web design implemented using Bootstrap for consistent user experience across various devices and screen sizes.',
					image: '/otf3.png',
				},
				{
					title: 'Vue3 Composition API',
					text: 'Advanced use of Vue3 composition API for managing component logic and state in a more readable and maintainable way.',
					image: '/otf1.png',
				},
				{
					title: 'Custom Video Background',
					text: 'Custom video background integration on the home page for engaging user experience.',
					image: '/otf2.png',
				},
				{
					title: 'Interactive Carousels',
					text: 'Interactive elements like carousels for testimonials and classes, implemented with Vue3-carousel and customized with detailed CSS for a unique look.',
					image: '/otf3.png',
				},
				{
					title: 'Sophisticated Contact Form',
					text: 'Sophisticated contact form with Vue3 reactivity features, ensuring instant UI updates and validations.',
					image: '/otf5.png',
				},
			],
			challenges: [
				{
					title: 'Cross-Browser and Cross-Device Compatibility',
					text: 'Ensuring cross-browser and cross-device compatibility, particularly with dynamic content and animations.',
					image: '',
				},
				{
					title: 'Performance Optimization',
					text: 'Optimizing the loading times and performance of high-quality images and video content without sacrificing the visual quality.',
					image: '',
				},
				{
					title: 'Vue3 Carousel Plugin Integration',
					text: 'Integrating the Vue3 Carousel plugin with custom styling and responsive design parameters to display content effectively.',
					image: '',
				},
				{
					title: 'Flexible Layout Development',
					text: 'Developing a flexible layout that adjusts perfectly on different devices while maintaining a high-quality user interface.',
					image: '',
				},
			],
			learnings: [
				{
					title: 'Vue3 Composition API',
					points: [
						{
							text: 'Embraced the power of the Vue3 Composition API to create more flexible and reusable code by encapsulating related logic into composable functions.',
							image: '',
						},
						{
							text: "Leveraged Vue3's reactive and ref APIs to create dynamic and responsive data bindings, enabling real-time updates and seamless synchronization between components.",
							image: '',
						},
						{
							text: 'Implemented watchers and computed properties using the Composition API to handle complex data dependencies and perform efficient calculations.',
							image: '',
						},
					],
				},
				{
					title: 'TypeScript Integration',
					points: [
						{
							text: 'Integrated TypeScript into the Vue3 project to enhance code quality, maintainability, and scalability by adding static typing and type checking.',
							image: '',
						},
						{
							text: 'Defined clear interfaces and types for component props, emits, and state to improve code readability and catch potential type-related bugs during development.',
							image: '',
						},
						{
							text: 'Utilized TypeScript features like enums, type aliases, and type assertions to create more expressive and self-documenting code.',
							image: '',
						},
					],
				},
				{
					title: 'Responsive Web Design',
					points: [
						{
							text: 'Implemented responsive web design principles using CSS media queries and flexible layouts to ensure optimal viewing experience across various devices and screen sizes.',
							image: '',
						},
						{
							text: "Utilized Bootstrap's responsive grid system and utility classes to create a consistent and responsive layout structure throughout the website.",
							image: '',
						},
						{
							text: 'Optimized images and assets for different device resolutions to minimize load times and enhance performance on mobile devices.',
							image: '/otf5.png',
						},
					],
				},
			],
			additionalImages: ['/otf1.png', '/otf2.png', '/otf3.png'],
		},
	},
	{
		title: 'AF Buddy',
		description:
			'AF Buddy is a feature-rich Chrome extension that provides developers with tools like geolocation spoofing, user agent emulation, and JSON editing, enhancing the web development process.',
		imgUrl: '/afbuddy1.png',
		repoUrl: 'https://github.com/JayRichh/afbuddy',
		liveUrl: '',
		details: {
			title: 'AF Buddy',
			description:
				'AF Buddy integrates a suite of tools into a single Chrome extension to assist developers in testing and developing web applications. It features dynamic UI components built with Vue.js, leveraging Vuex for state management and GSAP for smooth animations.',
			technologies: ['Vue.js', 'JavaScript', 'CSS', 'Vuex', 'GSAP'],
			features: [
				{
					title: 'Dynamic Navigation Bar',
					text: 'Dynamic navigation bar that allows users to switch between tools using GSAP-driven animations, enhancing the user experience with smooth transitions.',
					image: '/afbuddy2.png',
				},
				{
					title: 'Code Snippet Management',
					text: "Code snippet management which utilizes Vue's reactivity system to provide live search results as the user types, backed by local storage to persist data across sessions.",
					image: '/afbuddy3.png',
				},
				{
					title: 'Geolocation Spoofing',
					text: 'Geolocation spoofing implemented with a dedicated Vue component that binds input fields to Vuex store, enabling instant updates across the extension without page reloads.',
					image: '/afbuddy4.png',
				},
				{
					title: 'User Agent Switching',
					text: 'User agent switching functionality that allows users to emulate different devices by selecting from a pre-populated list of user agents stored in Vuex state, facilitating quick testing of responsive designs.',
					image: '/afbuddy5.png',
				},
				{
					title: 'JSON Editor',
					text: 'A robust JSON editor built with the Monaco editor integrated into a Vue component, offering features like syntax highlighting, auto-formatting, and error detection to facilitate easy manipulation of JSON data.',
					image: '/afbuddy6.png',
				},
				{
					title: 'Theme Selector',
					text: 'Theme selector that applies selected themes dynamically to the Monaco editor and other parts of the UI, using CSS variables and Vuex for state management to ensure theme preferences are maintained across the extension.',
					image: '/afbuddy7.png',
				},
			],
			challenges: [
				{
					title: 'UI Responsiveness and Intuitiveness',
					text: 'Designing a user interface that remains responsive and intuitive despite the heavy feature set, requiring careful management of Vue components and Vuex state.',
					image: '',
				},
				{
					title: 'Monaco Editor Integration',
					text: 'Implementing a seamless integration of the Monaco editor within a Vue component, addressing challenges related to component lifecycle and editor instantiation.',
					image: '',
				},
				{
					title: 'Efficient Data Binding and State Updates',
					text: 'Ensuring efficient data binding and state updates without performance degradation, particularly for features like the dynamic navigation bar and live search functionality in the code snippet manager.',
					image: '',
				},
				{
					title: 'Extension Load Balancing',
					text: 'Balancing the load of the extension to prevent high memory usage, especially when handling large datasets in the JSON editor and maintaining a smooth user experience.',
					image: '',
				},
			],
			learnings: [
				{
					title: 'Vue.js Mastery',
					points: [
						{
							text: 'Developed a deep understanding of Vue.js component design patterns and best practices for building scalable and maintainable applications.',
							image: '',
						},
						{
							text: 'Mastered the use of Vuex for efficient state management, ensuring a single source of truth and predictable state mutations throughout the application.',
							image: '',
						},
						{
							text: 'Leveraged Vue.js reactivity system to create dynamic and responsive user interfaces that update in real-time based on user interactions and data changes.',
							image: '',
						},
					],
				},
				{
					title: 'Browser Extension Development',
					points: [
						{
							text: 'Gained expertise in developing browser extensions, adhering to the specific requirements and constraints of the extension environment.',
							image: '',
						},
						{
							text: 'Implemented secure communication between the extension and web pages, ensuring data privacy and protection against cross-site scripting attacks.',
							image: '',
						},
						{
							text: 'Utilized browser APIs effectively to access and manipulate web page content, storage, and user preferences.',
							image: '',
						},
					],
				},
				{
					title: 'Performance Optimization',
					points: [
						{
							text: 'Implemented code splitting and lazy loading techniques to reduce initial bundle size and improve load times.',
							image: '',
						},
						{
							text: 'Optimized Vue.js components and Vuex store to minimize unnecessary re-renders and computations, resulting in better performance.',
							image: '',
						},
						{
							text: 'Conducted thorough performance profiling and applied memoization and caching strategies to eliminate performance bottlenecks.',
							image: '/afbuddy1.png',
						},
					],
				},
			],
			additionalImages: ['/afbuddy2.png', '/afbuddy3.png', '/afbuddy4.png', '/afbuddy5.png'],
		},
	},
	{
		title: 'Chat with DALL-E Integration',
		description:
			"An innovative chat application that combines real-time messaging with the ability to generate and manipulate images directly in the chat using OpenAI's DALL-E.",
		imgUrl: '/chat1.png',
		repoUrl: 'https://github.com/JayRichh/chat',
		liveUrl: 'https://jaychat.onrender.com/',
		details: {
			title: 'Chat with DALL-E Integration',
			description:
				"This application leverages the capabilities of OpenAI's DALL-E to provide a unique chat experience where users can not only communicate in real-time but also create, edit, and vary images based on textual prompts. It integrates cutting-edge AI technology into a seamless chat interface.",
			technologies: ['React', 'Node.js', 'Express', 'OpenAI', 'Styled-Components'],
			features: [
				{
					title: 'Real-Time Chat',
					text: 'Allows users to send and receive messages instantaneously, enhancing interaction within the chat application.',
					image: '/chat2.png',
				},
				{
					title: 'DALL-E Image Generation',
					text: "Integrates with OpenAI's DALL-E to generate images from textual descriptions provided by users in the chat.",
					image: '/chat1.png',
				},
				{
					title: 'Image Editing and Variation',
					text: 'Supports advanced image manipulation features, including editing specific parts of an image and generating variations of an existing image.',
					image: '/chat2.png',
				},
				{
					title: 'Responsive Design',
					text: 'Ensures that the chat application is accessible and functional on various devices, providing a consistent user experience across platforms.',
					image: '/chat1.png',
				},
				{
					title: 'Seamless Mode Switching',
					text: 'Users can seamlessly switch between standard chat mode and DALL-E mode to generate or edit images, enhancing the interactive experience.',
					image: '/chat2.png',
				},
			],
			challenges: [
				{
					title: 'Integrating AI with Real-Time Systems',
					text: 'Balancing the load between real-time chat functionalities and computationally intensive AI operations for image generation.',
					image: '',
				},
				{
					title: 'API Rate Limiting',
					text: 'Managing API usage to stay within the rate limits imposed by OpenAI, ensuring that the application remains efficient and cost-effective.',
					image: '',
				},
				{
					title: 'Data Privacy',
					text: 'Ensuring that all user data, especially the images generated and manipulated through DALL-E, are handled securely to protect user privacy.',
					image: '',
				},
				{
					title: 'User Experience Design',
					text: 'Designing a user-friendly interface that accommodates both chat and advanced AI features without overwhelming the user.',
					image: '',
				},
			],
			learnings: [
				{
					title: 'Real-Time Web Technologies',
					points: [
						{
							text: 'Gained profound knowledge in WebSocket and other real-time technologies that facilitate live, bidirectional communication between clients and servers.',
							image: '',
						},
						{
							text: 'Learned to implement efficient message broadcasting to synchronize state across clients instantly.',
							image: '',
						},
					],
				},
				{
					title: 'AI Integration in Web Applications',
					points: [
						{
							text: "Acquired skills in integrating AI APIs, specifically OpenAI's DALL-E, into web applications to enhance functionality.",
							image: '',
						},
						{
							text: 'Developed proficiency in handling AI-driven tasks such as image generation and editing within a real-time chat application context.',
							image: '',
						},
					],
				},
				{
					title: 'Advanced Frontend Techniques',
					points: [
						{
							text: 'Mastered advanced React patterns and state management strategies to handle complex stateful interactions in a scalable way.',
							image: '',
						},
						{
							text: 'Enhanced skills in Styled-Components for dynamically generating CSS based on application state.',
							image: '',
						},
					],
				},
			],
			additionalImages: ['/chat1.png', '/chat2.png', '/chat1.png', '/chat2.png'],
		},
	},
	{
		title: 'The Odin Project',
		description: 'A collection of projects and learnings from my journey through The Odin Project curriculum.',
		imgUrl: '/project-img7.png',
		repoUrl: 'https://github.com/JayRichh/the-odin-project',
		liveUrl: '',
		details: {
			title: 'The Odin Project - Learning Journey',
			description:
				'This project represents my learning journey through The Odin Project curriculum. It encompasses a wide range of projects and exercises that have helped me develop my web development skills.',
			technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
			features: [
				{
					title: 'Diverse Collection of Projects',
					text: 'A diverse collection of projects covering various web development concepts',
					image: '/project-img1.png',
				},
				{
					title: 'Detailed Documentation',
					text: 'Detailed documentation and reflections on each project',
					image: '/project-img2.png',
				},
				{
					title: 'Progression Path',
					text: 'Progression from basic HTML/CSS projects to complex full-stack applications',
					image: '/project-img3.png',
				},
				{
					title: 'Emphasis on Best Practices',
					text: 'Emphasis on best practices, clean code, and problem-solving skills',
					image: '/project-img4.png',
				},
			],
			challenges: [
				{
					title: 'Understanding New Concepts and Technologies',
					text: 'Understanding and applying new concepts and technologies',
					image: '',
				},
				{
					title: 'Debugging and Troubleshooting',
					text: 'Debugging and troubleshooting complex issues',
					image: '',
				},
				{
					title: 'Designing Efficient Algorithms',
					text: 'Designing and implementing efficient algorithms and data structures',
					image: '',
				},
				{
					title: 'Project Scope and Motivation',
					text: 'Managing project scope and maintaining motivation throughout the learning process',
					image: '',
				},
			],
			learnings: [
				{
					title: 'Web Development Fundamentals',
					points: [
						{
							text: 'Gained a solid understanding of HTML structure and semantic elements, enabling the creation of well-organized and accessible web pages.',
							image: '',
						},
						{
							text: 'Mastered CSS styling techniques, including responsive layouts, flexbox, and grid systems, to create visually appealing and adaptive user interfaces.',
							image: '',
						},
						{
							text: 'Developed proficiency in vanilla JavaScript, including DOM manipulation, event handling, and asynchronous programming using promises and async/await.',
							image: '',
						},
					],
				},
				{
					title: 'Full-stack JavaScript Development',
					points: [
						{
							text: 'Acquired expertise in building dynamic and interactive user interfaces using React, leveraging components, state management, and lifecycle methods.',
							image: '',
						},
						{
							text: 'Learned server-side development with Node.js and Express, creating RESTful APIs, handling HTTP requests, and integrating with databases.',
							image: '',
						},
						{
							text: 'Implemented authentication and authorization mechanisms, including user registration, login, and secure password hashing.',
							image: '/project-img5.png',
						},
					],
				},
				{
					title: 'Databases and Persistence',
					points: [
						{
							text: 'Gained hands-on experience with MongoDB, a NoSQL database, to store and retrieve data efficiently.',
							image: '',
						},
						{
							text: 'Designed and implemented data models and schemas to structure and organize application data.',
							image: '',
						},
						{
							text: 'Performed CRUD operations using Mongoose, an Object-Document Mapper (ODM), to interact with the database from the Node.js application.',
							image: '',
						},
					],
				},
				{
					title: 'Problem Solving and Collaboration',
					points: [
						{
							text: 'Developed strong problem-solving skills by tackling complex coding challenges and finding efficient solutions.',
							image: '',
						},
						{
							text: 'Collaborated with other developers through pair programming and code reviews, learning best practices and improving code quality.',
							image: '',
						},
						{
							text: 'Engaged in the open-source community by contributing to projects and participating in discussions on forums and chat channels.',
							image: '',
						},
					],
				},
			],
			additionalImages: ['/project-img6.png', '/project-img7.png', '/project-img1.png', '/project-img2.png'],
		},
	},
	{
		title: 'Elf Game',
		description:
			'An interactive game where players hunt for elves in a virtual environment, using Vue.js for the frontend and Node.js with Express for the backend.',
		imgUrl: '/project-img4.png',
		repoUrl: 'https://github.com/JayRichh/Elf',
		liveUrl: '',
		details: {
			title: 'Elf Game',
			description:
				'Elf Game offers a fun and interactive environment where players click on elves to accumulate points, backed by a robust backend API for managing game state, player scores, and high scores.',
			technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Mongoose'],
			features: [
				{
					title: 'Interactive Gameplay',
					text: 'Players interact with a game board to locate and click elves, which are dynamically generated within the game area.',
					image: '/project-img5.png',
				},
				{
					title: 'Real-Time Score Updates',
					text: 'Using MongoDB, the game updates player scores in real-time, ensuring a competitive and engaging experience.',
					image: '/project-img6.png',
				},
				{
					title: 'Responsive Game Design',
					text: 'The game interface adapts to different screen sizes and resolutions, providing an optimal gaming experience on both desktop and mobile devices.',
					image: '/project-img7.png',
				},
			],
			challenges: [
				{
					title: 'State Management',
					text: 'Managing the state of the game across different clients in real-time presented challenges, particularly in synchronizing the positions of the elves and player interactions.',
					image: '',
				},
				{
					title: 'Performance Optimization',
					text: 'Optimizing the game for performance was crucial, especially to handle multiple players interacting with the game simultaneously without lag.',
					image: '',
				},
			],
			learnings: [
				{
					title: 'Vue.js and Node.js Integration',
					points: [
						{
							text: 'Gained valuable experience in integrating Vue.js with Node.js and Express to handle real-time data updates and state management efficiently.',
							image: '',
						},
						{
							text: 'Developed a deeper understanding of MongoDB for real-time, high-volume data handling and optimization to support game dynamics.',
							image: '',
						},
					],
				},
			],
			additionalImages: ['/project-img1.png', '/project-img2.png', '/project-img3.png'],
		},
	},
]
