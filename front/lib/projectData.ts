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
		title: 'Off The Floor',
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
					image: '/otf4.png',
				},
				{
					title: 'Responsive Web Design',
					text: 'Responsive web design implemented using Bootstrap for consistent user experience across various devices and screen sizes.',
					image: '/otf2.png',
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
				}
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
					image: '/afbuddy4.png',
				},
				{
					title: 'Geolocation Spoofing',
					text: 'Geolocation spoofing implemented with a dedicated Vue component that binds input fields to Vuex store, enabling instant updates across the extension without page reloads.',
					image: '/afbuddy7.png',
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
					image: '/afbuddy3.png',
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
			"Chat application that combines real-time messaging with the ability to generate and manipulate images directly in the chat using OpenAI's DALL-E.",
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
					image: '',
				},
				{
					title: 'Responsive Design',
					text: 'Ensures that the chat application is accessible and functional on various devices, providing a consistent user experience across platforms.',
					image: '',
				},
				{
					title: 'Seamless Mode Switching',
					text: 'Users can seamlessly switch between standard chat mode and DALL-E mode to generate or edit images, enhancing the interactive experience.',
					image: '',
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
					text: 'Managing API usage to stay within the rate limits imposed by OpenAI.',
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
		description:
			'A comprehensive collection of projects and learnings from my journey through The Odin Project curriculum, showcasing my growth and skill development as a web developer.',
		imgUrl: '/top10.png',
		repoUrl: 'https://github.com/JayRichh/the-odin-project',
		liveUrl: '',
		details: {
			title: 'The Odin Project - Learning Journey',
			description:
				'This project represents my learning journey through The Odin Project curriculum, encompassing a wide range of projects and exercises that have helped me develop my web development skills.',
			technologies: [
				'HTML',
				'CSS',
				'JavaScript',
				'React',
				'Node.js',
				'Express',
				'MongoDB',
				'Firebase',
				'Jest',
				'Webpack',
			],
			features: [
				{
					title: 'Todo App',
					text: 'A feature-rich todo application built with React and Firebase. Utilizes Firebase Realtime Database for data persistence and synchronization. Implements task creation, editing, deletion, and categorization. Includes user authentication and authorization using Firebase Authentication.',
					image: '/top3.png',
				},
				{
					title: 'Calculator App',
					text: 'A fully functional calculator application developed using HTML, CSS, and JavaScript. Supports basic arithmetic operations, decimal handling, and keyboard input. Implements a responsive design and follows accessibility best practices.',
					image: '/project-img5.png',
				},
				{
					title: 'Restaurant Website',
					text: 'A dynamic restaurant website built with HTML, CSS, and JavaScript. Features tabbed browsing for easy navigation and a responsive layout that adapts to different screen sizes. Incorporates interactive elements such as image sliders and smooth scrolling.',
					image: '/project-img4.png',
				},
				{
					title: 'Tic-Tac-Toe Game',
					text: 'A classic tic-tac-toe game implemented using HTML, CSS, and JavaScript. Utilizes a modular architecture with separate files for game logic and UI rendering. Includes a responsive grid layout and supports both human vs. human and human vs. computer gameplay.',
					image: '/project-img10.png',
				},
				{
					title: 'Etch-a-Sketch',
					text: 'An interactive drawing application built with HTML, CSS, and JavaScript. Allows users to create pixelated art by hovering over a dynamically generated grid. Provides options for adjusting grid size, color, and eraser functionality. Utilizes DOM manipulation and event handling.',
					image: '/top9.png',
				},
				{
					title: 'Elf Game',
					text: 'An interactive game built with Vue.js and Node.js, where players search for elves in a virtual environment. Utilizes MongoDB for real-time score updates and leaderboard management. Features a responsive game design that adapts to different screen sizes and devices.',
					image: ''
					},
				{
					title: 'Blog Application',
					text: 'A full-stack blog application developed using React, Node.js, Express, and MongoDB. Implements CRUD functionality for blog posts and user management. Utilizes RESTful API architecture and JWT-based authentication. Incorporates rich text editing capabilities and markdown support.',
					image: '/project-img7.png',
				},
				{
					title: 'CV Builder',
					text: 'A CV builder application built with React and TypeScript. Allows users to input their personal information, work experience, education, and skills. Generates a professional-looking CV in PDF format. Utilizes React hooks and context API for state management.',
					image: '/top7.png',
				},
				{
					title: 'Weather App',
					text: 'A weather application developed using HTML, CSS, JavaScript, and the OpenWeatherMap API. Retrieves and displays real-time weather data based on user location or search input. Implements error handling and loading states. Utilizes Promises and Fetch API for asynchronous data fetching.',
					image: '/top10.png',
				},
			],
			challenges: [
				{
					title: 'State Management in React',
					text: 'Managing state efficiently in larger React applications, ensuring proper data flow and synchronization between components. Solved by utilizing state management libraries like Redux or the Context API.',
					image: '',
				},
				{
					title: 'Asynchronous Data Fetching',
					text: 'Handling asynchronous data fetching and managing loading states effectively. Addressed by using Promises, async/await, and libraries like Axios for making API requests.',
					image: '',
				},
				{
					title: 'CSS Layout and Responsiveness',
					text: 'Creating responsive layouts that adapt to different screen sizes and devices. Overcame by leveraging CSS flexbox, grid, and media queries, along with responsive design principles.',
					image: '',
				},
				{
					title: 'Backend API Development',
					text: 'Designing and implementing robust backend APIs using Node.js and Express. Tackled by following RESTful principles, handling authentication and authorization, and utilizing middleware for request validation and error handling.',
					image: '',
				},
				{
					title: 'Testing and Debugging',
					text: 'Writing comprehensive unit tests and debugging complex issues. Addressed by using testing frameworks like Jest and Mocha, and utilizing browser developer tools and debugging techniques.',
					image: '',
				},
			],
			learnings: [
				{
					title: 'Front-end Development',
					points: [
						{
							text: 'Mastered HTML5 semantic elements and accessibility best practices.',
							image: '',
						},
						{
							text: 'Gained proficiency in CSS3 layout techniques, responsive design, and CSS preprocessors like Sass.',
							image: '',
						},
						{
							text: 'Became skilled in JavaScript ES6+ features, DOM manipulation, and asynchronous programming.',
							image: '',
						},
						{
							text: 'Acquired expertise in React, including component lifecycle, hooks, and state management.',
							image: '',
						},
					],
				},
				{
					title: 'Back-end Development',
					points: [
						{
							text: 'Learned server-side development with Node.js and Express, creating RESTful APIs and handling database integration.',
							image: '',
						},
						{
							text: 'Gained knowledge of database design, data modeling, and querying using MongoDB and Mongoose.',
							image: '',
						},
						{
							text: 'Implemented authentication and authorization mechanisms, including JWT and session-based authentication.',
							image: '',
						},
						{
							text: 'Acquired experience in server deployment, scaling, and performance optimization.',
							image: '',
						},
					],
				},
				{
					title: 'Testing and Debugging',
					points: [
						{
							text: 'Developed skills in writing unit tests using frameworks like Jest and Mocha.',
							image: '',
						},
						{
							text: 'Learned debugging techniques using browser developer tools and Node.js debugging tools.',
							image: '',
						},
						{
							text: 'Gained knowledge of test-driven development (TDD) and integration testing.',
							image: '',
						},
					],
				},
				{
					title: 'Version Control and Collaboration',
					points: [
						{
							text: 'Mastered Git version control, including branching, merging, and resolving conflicts.',
							image: '',
						},
						{
							text: 'Collaborated with other developers using GitHub, participating in code reviews and pull requests.',
							image: '',
						},
						{
							text: 'Learned agile development methodologies and project management tools like Trello and Jira.',
							image: '',
						},
					],
				},
				{
					title: 'Web Performance and Optimization',
					points: [
						{
							text: 'Acquired knowledge of web performance optimization techniques, including minification, bundling, and lazy loading.',
							image: '',
						},
						{
							text: 'Learned about browser rendering optimization, critical rendering path, and performance metrics.',
							image: '',
						},
						{
							text: 'Implemented caching strategies and content delivery networks (CDNs) for faster content delivery.',
							image: '',
						},
					],
				},
				{
					title: 'Continuous Learning and Problem Solving',
					points: [
						{
							text: 'Developed a growth mindset and embraced continuous learning throughout the curriculum.',
							image: '',
						},
						{
							text: 'Enhanced problem-solving skills by tackling complex coding challenges and seeking optimal solutions.',
							image: '',
						},
						{
							text: 'Learned to break down large problems into smaller, manageable tasks and iterate on solutions.',
							image: '',
						},
					],
				},
			],
			additionalImages: ['/top8.png', '/afbuddy7.png', '/project-img4.png'],
		},
	},
	// {
	// 	title: 'Portfolio Website with Interactive Elements',
	// 	description:
	// 		'A portfolio website that showcases my projects, skills, and experience through interactive features and a mini-game, demonstrating my abilities in web development and creating engaging user experiences.',
	// 	imgUrl: '/project-img1.png',
	// 	repoUrl: 'https://github.com/JayRichh/portfolio',
	// 	liveUrl: 'https://jayrichh.com',
	// 	details: {
	// 		title: 'Portfolio Website',
	// 		description:
	// 			'My personal portfolio website includes an interactive hero page and a multiplayer mini-game, highlighting my proficiency in web development, 3D graphics, physics simulations, and real-time networking. The website aims to provide visitors with an immersive and memorable experience while presenting my work and capabilities.',
	// 		technologies: ['Next.js', 'React', 'Three.js', 'Tailwind CSS', 'TypeScript', 'WebSockets', 'Node.js'],
	// 		features: [
	// 			{
	// 				title: 'Interactive Hero Page',
	// 				text: 'The hero page features an interactive 3D scene that responds to user input, creating an engaging and dynamic introduction to the portfolio. Visitors can interact with various elements and explore the scene, adding a layer of immersion and interest.',
	// 				image: '/project-img2.png',
	// 			},
	// 			{
	// 				title: 'Physics-based Interactions',
	// 				text: 'Both the hero page and the mini-game incorporate physics simulations to enhance the sense of realism and interactivity. Objects behave in a lifelike manner, responding to user interactions and collisions, creating a more engaging and believable experience.',
	// 				image: '/project-img3.png',
	// 			},
	// 			{
	// 				title: 'Multiplayer Mini-Game',
	// 				text: 'The portfolio includes a multiplayer mini-game that allows visitors to interact and collaborate with each other in real-time. Players can explore a shared virtual environment, compete in challenges, and engage in social experiences, adding an extra layer of interactivity and fun to the website.',
	// 				image: '/project-img4.png',
	// 			},
	// 			{
	// 				title: 'Responsive Design',
	// 				text: 'The portfolio website is built with a responsive design approach, ensuring that it adapts seamlessly to different screen sizes and devices. Whether accessed on a desktop computer, tablet, or mobile phone, the website maintains its visual appeal, functionality, and performance.',
	// 				image: '/project-img5.png',
	// 			},
	// 		],
	// 		challenges: [
	// 			{
	// 				title: 'Integration of Technologies',
	// 				text: 'One of the main challenges in developing the portfolio website was integrating various technologies and libraries seamlessly. Ensuring smooth communication and synchronization between the front-end and back-end components, as well as optimizing the performance of 3D graphics and physics simulations, required careful planning and implementation.',
	// 				image: '',
	// 			},
	// 			{
	// 				title: 'Performance Optimization',
	// 				text: 'Optimizing the performance of the website and mini-game was crucial to provide a smooth and responsive user experience. This involved techniques such as asset optimization, efficient rendering, and minimizing resource usage to ensure fast loading times and smooth interactions across different devices and network conditions.',
	// 				image: '',
	// 			},
	// 			{
	// 				title: 'Balancing Interactivity and Content',
	// 				text: 'Striking the right balance between interactive elements and the presentation of projects, skills, and experience was another challenge. The goal was to create an engaging and immersive experience without overwhelming visitors or detracting from the main purpose of showcasing my work and abilities.',
	// 				image: '',
	// 			},
	// 		],
	// 		learnings: [
	// 			{
	// 				title: '3D Graphics and Physics',
	// 				points: [
	// 					{
	// 						text: 'Developing the portfolio website provided valuable experience in creating immersive 3D environments and incorporating realistic physics simulations. I learned techniques for modeling, texturing, and animating 3D assets, as well as optimizing their performance for web-based delivery.',
	// 						image: '',
	// 					},
	// 					{
	// 						text: 'I gained knowledge in using libraries like Three.js and physics engines to create interactive and dynamic scenes that respond to user input and simulate real-world behavior. This involved learning about scene management, camera controls, lighting, and rendering optimizations.',
	// 						image: '/project-img6.png',
	// 					},
	// 				],
	// 			},
	// 			{
	// 				title: 'Multiplayer Networking',
	// 				points: [
	// 					{
	// 						text: 'Implementing the multiplayer mini-game required diving into real-time networking concepts and technologies. I learned about WebSockets and how to establish bi-directional communication between clients and servers to enable real-time interactions and updates.',
	// 						image: '',
	// 					},
	// 					{
	// 						text: 'I gained experience in designing and implementing network protocols, handling data synchronization, and optimizing network performance to minimize latency and ensure a smooth multiplayer experience. This involved techniques such as client-side prediction, interpolation, and handling network interruptions gracefully.',
	// 						image: '',
	// 					},
	// 				],
	// 			},
	// 			{
	// 				title: 'Web Development Best Practices',
	// 				points: [
	// 					{
	// 						text: 'Throughout the development of the portfolio website, I reinforced my understanding of web development best practices. This included creating modular and reusable code components, following a clean and maintainable architecture, and using version control effectively.',
	// 						image: '',
	// 					},
	// 					{
	// 						text: 'I also gained valuable insights into performance optimization techniques, such as lazy loading, code splitting, and caching strategies, to ensure fast loading times and efficient resource utilization. Accessibility and cross-browser compatibility were also key considerations in the development process.',
	// 						image: '',
	// 					},
	// 				],
	// 			},
	// 		],
	// 		additionalImages: ['/project-img7.png', '/project-img8.png', '/project-img9.png'],
	// 	},
	// },
]