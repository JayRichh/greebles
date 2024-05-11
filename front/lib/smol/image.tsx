import React from 'react'

interface ImageProps {
	src: string
	alt: string
	title?: string
	className?: string
}

const Image: React.FC<ImageProps> = ({ src, alt, title, className }) => {
	return <img src={src} alt={alt} title={title} className={className} />
}

export default Image
