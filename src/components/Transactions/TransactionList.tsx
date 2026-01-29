import {
	DashboardIcon,
	DownloadIcon,
	TrashIcon,
	UploadIcon,
} from "@radix-ui/react-icons";
import { centsToBRL } from "@/libs/currency";
import { cn } from "@/libs/merge";
import { useTransactionListViewModel } from "@/viewmodels";
import { EmptyState } from "../EmptyState";
import { Pagination } from "../Pagination";
import { Table } from "../Table";
import { Button } from "../ui/Button";
import { TransactionEditDialog } from "./TransactionEditDialog";
import { TransactionCreateDialog } from "./TransactionCreateDialog";

const filters = [
	{ id: "all", label: "Todos", icon: <DashboardIcon /> },
	{ id: "income", label: "Entradas", icon: <DownloadIcon /> },
	{ id: "outcome", label: "Saídas", icon: <UploadIcon /> },
] as const;

const skeletonIds = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"];

export function TranscationList() {
	const {
		transactions,
		page,
		totalPages,
		type,
		editId,
		isCreating,
		editingTransaction,
		isLoading,
		handlePageChange,
		handleTypeChange,
		handleOpenEdit,
		handleCloseEdit,
		handleCloseCreate,
		handleDelete,
		handleRestore,
	} = useTransactionListViewModel();

	const isDeleted = type === "deleted";

	return (
		<div className="flex flex-col gap-5 pb-20">
			<div className="flex gap-3 overflow-x-auto">
				{filters.map((f) => (
					<Button
						key={f.id}
						variant={type === f.id ? "active" : "outline"}
						onClick={() => handleTypeChange(f.id)}
					>
						{f.icon}
						{f.label}
					</Button>
				))}
				<Button
					variant={type === "deleted" ? "active" : "outline"}
					onClick={() => handleTypeChange("deleted")}
					className="ml-auto"
				>
					<TrashIcon />
					Excluídos
				</Button>
			</div>

			{isLoading ? (
				<div className="flex flex-col items-center w-full gap-6">
					<Table.Root>
						<Table.Body>
							{skeletonIds.map((id) => (
								<Table.SkeletonRow key={id}>
									<Table.Cell>
										<div className="w-4.5 h-4.5 bg-neutral-800 rounded animate-pulse" />
										<div className="w-20 h-4 bg-neutral-800 rounded animate-pulse" />
									</Table.Cell>
									<div className="w-8 h-8 bg-neutral-800 rounded-lg animate-pulse" />
								</Table.SkeletonRow>
							))}
						</Table.Body>
					</Table.Root>
				</div>
			) : transactions.length === 0 ? (
				<EmptyState
					title={
						isDeleted
							? "Nenhum lançamento excluído"
							: "Nenhum lançamento cadastrado"
					}
					description={
						isDeleted
							? "Todos os seus lançamentos estão ativos."
							: "Caso para adicionar clique em novo valor ou se quiser resgatar um antigo clique em excluídos."
					}
				/>
			) : (
				<div className="flex flex-col items-center w-full gap-6.25">
					<Table.Root>
						<Table.Body>
							{transactions.map((tx) => (
								<Table.Row
									key={tx.id}
									tabIndex={0}
									onClick={() => !isDeleted && handleOpenEdit(tx.id)}
									onKeyDown={(e) => {
										if (isDeleted) return;
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											handleOpenEdit(tx.id);
										}
									}}
									className={isDeleted ? "cursor-default" : undefined}
								>
									<Table.Cell>
										{tx.type === "income" ? (
											<DownloadIcon className="w-4.5 h-4.5 text-emerald-500" />
										) : (
											<UploadIcon className="w-4.5 h-4.5 text-pink-600" />
										)}
										<span
											className={cn(
												"text-base font-normal",
												tx.type === "income"
													? "text-emerald-500"
													: "text-pink-600",
											)}
										>
											{centsToBRL(tx.amount)}
										</span>
									</Table.Cell>

									<Table.Cell>
										{isDeleted ? (
											<Button
												variant="outline"
												onClick={(e) => {
													e.stopPropagation();
													handleRestore(tx.id);
												}}
											>
												Restaurar
											</Button>
										) : (
											<Button
												variant="icon-destructive"
												size="icon"
												onClick={(e) => {
													e.stopPropagation();
													handleDelete(tx.id);
												}}
											>
												<TrashIcon />
											</Button>
										)}
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>

					<Pagination
						page={page}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}

			<TransactionEditDialog
				transaction={editingTransaction}
				open={!!editId}
				onOpenChange={(open) => {
					if (!open) handleCloseEdit();
				}}
			/>

			<TransactionCreateDialog
				open={!!isCreating}
				onOpenChange={(open) => {
					if (!open) handleCloseCreate();
				}}
			/>
		</div>
	);
}
