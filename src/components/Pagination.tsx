import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/Button";

interface PaginationProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	page,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="flex items-center justify-center gap-2.5">
			<Button
				variant="outline"
				size="icon"
				shape="square"
				onClick={() => onPageChange(page - 1)}
				disabled={page <= 1}
			>
				<ChevronLeftIcon />
			</Button>

			{pages.map((p) => (
				<Button
					key={p}
					variant={p === page ? "active" : "outline"}
					size="icon"
					shape="square"
					onClick={() => onPageChange(p)}
				>
					{p}
				</Button>
			))}

			<Button
				variant="outline"
				size="icon"
				shape="square"
				onClick={() => onPageChange(page + 1)}
				disabled={page >= totalPages}
			>
				<ChevronRightIcon />
			</Button>
		</div>
	);
}
