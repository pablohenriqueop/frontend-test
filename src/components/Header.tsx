import { Link, useNavigate } from "@tanstack/react-router";
import type { TransactionsSearchParams } from "@/viewmodels";
import { Button } from "./ui/Button";

export function Header() {
	const navigate = useNavigate();

	return (
		<header className="flex items-center justify-between pb-(--header-pb) pt-(--header-pt)">
			<Link to="/" search={{ page: 1, limit: 9, type: "all" }}>
				<img src="/logo.svg" alt="Planey" title="Marca da Planey" />
			</Link>
			<Button
				variant="brand"
				shape="pill"
				onClick={() =>
					navigate({
						to: "/",
						search: (prev: Partial<TransactionsSearchParams>) => ({
							...prev,
							page: prev.page ?? 1,
							limit: prev.limit ?? 9,
							type: prev.type ?? "all",
							isCreating: true,
						}),
					})
				}
			>
				Novo valor
			</Button>
		</header>
	);
}
