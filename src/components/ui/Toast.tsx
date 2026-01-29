import * as ToastPrimitive from "@radix-ui/react-toast";
import * as React from "react";
import { cn } from "@/libs/merge";

const ToastProvider = ToastPrimitive.Provider;

const viewportVariants = {
	"top-right": "top-[20px] right-[14px]",
	"top-left": "top-[20px] left-[14px]",
	"bottom-right": "bottom-[20px] right-[14px]",
	"bottom-left": "bottom-[20px] left-[14px]",
	"top-center": "top-[20px] left-1/2 -translate-x-1/2",
	"bottom-center": "bottom-[20px] left-1/2 -translate-x-1/2",
};

interface ToastViewportProps
	extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
	position?: keyof typeof viewportVariants;
}

const ToastViewport = React.forwardRef<
	React.ComponentRef<typeof ToastPrimitive.Viewport>,
	ToastViewportProps
>(({ className, position = "top-right", ...props }, ref) => (
	<ToastPrimitive.Viewport
		ref={ref}
		className={cn(
			"fixed z-100 flex max-h-screen w-full flex-col p-4 sm:max-w-105",
			viewportVariants[position],
			className,
		)}
		{...props}
	/>
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

const Toast = React.forwardRef<
	React.ComponentRef<typeof ToastPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => (
	<ToastPrimitive.Root
		ref={ref}
		className={cn(
			"group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-4 shadow-lg transition-all",
			"data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x) data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=move]:transition-none",
			"data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
			className,
		)}
		{...props}
	/>
));
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastTitle = React.forwardRef<
	React.ComponentRef<typeof ToastPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
	<ToastPrimitive.Title
		ref={ref}
		className={cn("text-sm font-medium text-neutral-50", className)}
		{...props}
	/>
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
	React.ComponentRef<typeof ToastPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
	<ToastPrimitive.Description
		ref={ref}
		className={cn("text-sm text-neutral-500", className)}
		{...props}
	/>
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

const ToastClose = React.forwardRef<
	React.ComponentRef<typeof ToastPrimitive.Close>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
	<ToastPrimitive.Close
		ref={ref}
		className={cn(
			"absolute right-2 top-2 rounded-md p-1 text-neutral-500 opacity-0 transition-opacity hover:text-neutral-50 focus:opacity-100 focus:outline-none group-hover:opacity-100",
			className,
		)}
		toast-close=""
		{...props}
	/>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;

export {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
};
