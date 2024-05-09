import React, { useEffect, useRef } from 'react'
import { Text, Container } from '@mantine/core'
import classes from './Hero.module.css'
import { ThreeCanvas } from './smol/text'
import { useRouter } from 'next/router'
const Hero: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const router = useRouter()

	useEffect(() => {
		let threeCanvas: ThreeCanvas | null = null

		if (canvasRef.current) {
			threeCanvas = new ThreeCanvas(canvasRef.current, router)
			return () => {
				if (threeCanvas) {
					threeCanvas.dispose()
				}
			}
		}
	}, [])

	return (
		<Container className={classes.wrapper}>
			<div className={classes.inner}>
				<div className="page" style={{ display: 'none' }}>
					<div style={{ color: '#627254' }}>Jayden Richardson</div>
					<div style={{ color: '#76885B' }}>Web Developer</div>
				</div>
				<canvas ref={canvasRef} /> {/* 3D canvas */}
			</div>
		</Container>
	)
}

export default Hero
