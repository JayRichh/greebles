export const universalRelaxation = (tech: string) => {
  const techMap = {
      'Vue.js': ['Vue', 'Vue3', 'Vue 3', 'VueJS', 'Vue 2'],
      'React': ['React.js', 'ReactJS', 'React 18'],
      'CSS Framework': ['CSS','Tailwind CSS', 'Bootstrap', 'Styled-Components'],
      'JavaScript': ['JS', 'JavaScript', 'ECMAScript'],
      'TypeScript': ['TS', 'TypeScript'],
      'Node.js': ['Node', 'NodeJS', 'Node.js'],
      'Express': ['ExpressJS', 'Express.js'],
      'MongoDB': ['Mongo', 'MongoDB', 'Mongoose'],
      'HTML5': ['HTML', 'HTML5'],
      'CSS3': ['CSS', 'CSS3'],
      'Next.js': ['NextJS', 'Next.js'],
      'GSAP': ['GSAP'],
      'Firebase': ['Firebase'],
      'Vuex': ['Vuex'],
      'Bootstrap': ['Bootstrap'],
      'Three.js': ['ThreeJS', 'Three.js'],
      'WebSockets': ['Socket.io', 'WebSockets', 'SocketIO'],
      'Physics Engine': ['Rapier', 'Rapier Physics Engine', 'CANNON.js', 'CannonJS'],
      'AI': ['OpenAI', 'Claude'],
      'Styled-Components': ['Styled-Components'],
  };

  for (const [key, aliases] of Object.entries(techMap)) {
      if (aliases.includes(tech)) {
          return key;
      }
  }
  return tech;
};
