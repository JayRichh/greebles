import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded text-sm font-medium transition ease-in-out duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed',
	{
		variants: {
			variant: {
				minimal: 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100',
				ghost: 'hover:bg-gray-100',
				link: 'text-gray-700 hover:underline',
			},
			size: {
				sm: 'h-8 px-3',
				md: 'h-10 px-4',
				lg: 'h-12 px-6',
				icon: 'p-2',
			},
		},
		defaultVariants: {
			variant: 'minimal',
			size: 'md',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, rightIcon, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp className={buttonVariants({ variant, size }) + (className ? ` ${className}` : '')} ref={ref} {...props}>
				{props.children}
				{rightIcon && <span className="ml-2 inline-block">{rightIcon}</span>}
			</Comp>
		)
	}
)

Button.displayName = 'Button'

export { Button, buttonVariants }
