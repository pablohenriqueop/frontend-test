import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/libs/merge";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
	/>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentVariants = cva(
	"w-container max-w-[calc(100%-48px)] bg-[#171717] border border-[#262626] rounded-2xl p-6 gap-6 flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
	{
		variants: {
			position: {
				center:
					"fixed left-1/2 top-1/2 z-50 [transform:translate(-50%,-50%)] data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
				top: "fixed left-1/2 top-10 z-50 [transform:translateX(-50%)] data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-full",
				bottom:
					"fixed left-1/2 bottom-10 z-50 [transform:translateX(-50%)] data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-bottom-full",
			},
		},
		defaultVariants: {
			position: "center",
		},
	},
);

type DialogContentProps = React.ComponentPropsWithoutRef<
	typeof DialogPrimitive.Content
> &
	VariantProps<typeof dialogContentVariants>;

const DialogContent = React.forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Content>,
	DialogContentProps
>(({ className, children, onOpenAutoFocus, position, ...props }, ref) => {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				onOpenAutoFocus={(e) => {
					e.preventDefault();
					onOpenAutoFocus?.(e);
				}}
				className={cn(dialogContentVariants({ position, className }))}
				{...props}
			>
				{children}
				<DialogPrimitive.Close className="absolute right-6 top-6 rounded-full bg-[#262626] p-2 opacity-70 hover:opacity-100 transition-opacity focus:outline-none disabled:pointer-events-none">
					<Cross1Icon className="h-2.5 w-2.5 text-[#737373]" />
					<span className="sr-only">Fechar</span>
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPortal>
	);
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col gap-4", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("flex items-center justify-between", className)}
		{...props}
	/>
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn("text-sm font-normal text-neutral-50", className)}
		{...props}
	/>
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-neutral-500", className)}
		{...props}
	/>
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogClose,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};