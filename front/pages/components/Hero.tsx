import React, { useEffect, useRef } from 'react';
import { Text, Container, Button, Title, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import classes from './Hero.module.css';
import { ThreeCanvas } from '../../lib/smol/text';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)') ?? true;

  useEffect(() => {
    if (!isMobile) {
      let threeCanvas: ThreeCanvas | null = null;

      if (canvasRef.current) {
        threeCanvas = new ThreeCanvas(canvasRef.current, router);
        return () => {
          if (threeCanvas) {
            threeCanvas.dispose();
          }
          if (canvasRef.current) {
            canvasRef.current.remove();
          }
        };
      }
    }
  }, [isMobile, router]);

  if (isMobile) {
    return (
      <Container
        style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
					width: '100vw',
					gap: '2rem',
        }}
      >
				<Group style={{ display: 'flex', flexDirection: 'column', gap: '0rem' }}>
					<Title order={1} style={{ marginBottom: '1rem' }}>
						Jayden Richardson
					</Title>
					<Text size="lg" style={{ marginBottom: '2rem' }}>
						Web Developer
					</Text>
				</Group>

				<Group style={{ display: 'flex', flexDirection: 'column', gap: '0rem' }}>
        <Button
          style={{
            marginBottom: '1rem',
            borderColor: '#1e90ff', // Light blue
            borderWidth: '2px',
            color: 'white',
            backgroundColor: '#1e90ff', // Light blue
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            fontSize: '1rem',
						minWidth: '200px', // Restrict width
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: '200px', // Restrict width
            alignSelf: 'center',
          }}
          onClick={() => router.push('/about')}
        >
          About
        </Button>
        <Button
          style={{
            marginBottom: '1rem',
            borderColor: '#98fb98', // Light green
            borderWidth: '2px',
            color: 'white',
            backgroundColor: '#98fb98', // Light green
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            fontSize: '1rem',
						minWidth: '200px', // Restrict width
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: '200px', // Restrict width
            alignSelf: 'center',
          }}
          onClick={() => router.push('/play')}
        >
          Play
        </Button>
        <Button
          style={{
            borderColor: '#ff6347', // Light coral
            borderWidth: '2px',
            color: 'white',
            backgroundColor: '#ff6347', // Light coral
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            fontSize: '1rem',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
						minWidth: '200px', // Restrict width
            maxWidth: '200px', // Restrict width
            alignSelf: 'center',
          }}
          onClick={() => router.push('/code')}
        >
          Code
        </Button>
				</Group>
      </Container>
    );
  }

  return (
    <Container className={classes.wrapper}>
      <div className={classes.inner}>
        <div className="page" style={{ display: 'none' }}>
          <div style={{ color: '#627254' }}>Jayden Richardson</div>
          <div style={{ color: '#76885B' }}>Web Developer</div>
        </div>
        <canvas ref={canvasRef} />
      </div>
    </Container>
  );
};

export default Hero;