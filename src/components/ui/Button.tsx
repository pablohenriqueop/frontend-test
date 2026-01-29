import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/libs/merge";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap font-normal text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-main disabled:pointer-events-none disabled:opacity-50 border cursor-pointer",
	{
		variants: {
			variant: {
				brand:
					"bg-brand-main border-brand-border text-neutral-900 hover:opacity-90",

				outline:
					"bg-neutral-900 border-neutral-800 text-neutral-50 hover:bg-ui-active",

				active: "bg-ui-active border-brand-border text-brand-main",

				ghost:
					"bg-transparent border-transparent text-neutral-50 hover:bg-ui-active hover:border-neutral-800",

				"icon-destructive":
					"bg-destructive-main border-destructive-main text-pink-600 hover:bg-pink-600 hover:text-white hover:border-pink-600",
			},
			size: {
				default: "h-8 px-[14px] [&>svg]:w-4 [&>svg]:h-4",
				icon: "h-8 w-8 p-0",
			},
			shape: {
				pill: "rounded-[42px]",
				square: "rounded-lg",
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "default",
			shape: "pill",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, shape, asChild = false, ...props }, ref) => {
		const finalShape = shape || (size === "icon" ? "square" : "pill");

		const Comp = asChild ? Slot : "button";

		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, shape: finalShape, className }),
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
