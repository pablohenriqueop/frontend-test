import {
	Toast,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "./Toast";
import { useToast } from "./useToast";

interface ToasterProps {
	duration?: number;
	position?:
		| "top-right"
		| "top-left"
		| "bottom-right"
		| "bottom-left"
		| "top-center"
		| "bottom-center";
}

export function Toaster({
	duration = 10000,
	position = "top-right",
}: ToasterProps) {
	const { toasts } = useToast();

	return (
		<ToastProvider duration={duration}>
			{toasts.map((toast) => (
				<Toast key={toast.id}>
					{toast.icon && <span className="text-lg shrink-0">{toast.icon}</span>}
					<div className="flex flex-col gap-1">
						<ToastTitle>{toast.title}</ToastTitle>
						{toast.description && (
							<ToastDescription>{toast.description}</ToastDescription>
						)}
					</div>
				</Toast>
			))}
			<ToastViewport position={position} />
		</ToastProvider>
	);
}
