import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Header } from "../components/Header";
import { Toaster } from "../components/ui/Toaster";
import { ToastContextProvider } from "../components/ui/useToast";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<ToastContextProvider>
			<div className="min-h-screen text-foreground antialiased font-sans">
				<div className="w-container max-w-full mx-auto px-6 md:px-0">
					<Header />
					<main>
						<Outlet />
					</main>
				</div>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Toaster />
			</div>
		</ToastContextProvider>
	),
});
