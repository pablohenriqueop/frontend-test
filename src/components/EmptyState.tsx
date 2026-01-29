interface EmptyStateProps {
	title: string;
	description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-12 text-center">
			<h3 className="text-base font-normal text-neutral-50">{title}</h3>
			{description && (
				<p className="text-sm text-neutral-500 mt-4 max-w-xs">{description}</p>
			)}
		</div>
	);
}
