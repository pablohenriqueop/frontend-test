import { useNavigate, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@/adapters/query";
import { useToast } from "@/components/ui/useToast";
import type { Transaction, TransactionFilter } from "@/models";
import { transactionService } from "@/services/transaction.service";

export const transactionsSearchSchema = z.object({
	page: z.number().min(1).catch(1),
	limit: z.number().min(1).catch(9),
	type: z.enum(["all", "income", "outcome", "deleted"]).catch("all"),
	editId: z.string().optional(),
	isCreating: z.boolean().optional(),
});

export type TransactionsSearchParams = z.infer<typeof transactionsSearchSchema>;

export function useTransactionListViewModel() {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { page, limit, type, editId, isCreating } = useSearch({ from: "/" });
	const navigate = useNavigate({ from: "/" });

	const queryKey = ["transactions", page, limit, type] as const;

	const query = useQuery({
		queryKey,
		queryFn: () => transactionService.getAll({ page, limit, type }),
	});

	const deleteMutation = useMutation({
		mutationFn: transactionService.softDelete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			toast({
				title: "Valor removido",
				description: "O item foi movido para a lixeira.",
			});
		},
	});

	const restoreMutation = useMutation({
		mutationFn: transactionService.restore,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			toast({
				title: "Valor restaurado",
				description: "Já pode visualizar na lista.",
			});
		},
	});

	const transactions = query.data?.data ?? [];
	const totalPages = query.data?.pages ?? 1;

	const editingTransaction = transactions.find(
		(tx: Transaction) => tx.id === editId,
	);

	const handlePageChange = (newPage: number) => {
		navigate({
			search: (prev) => ({ ...prev, page: newPage }),
		});
	};

	const handleTypeChange = (newType: TransactionFilter) => {
		navigate({
			search: (prev) => ({ ...prev, type: newType, page: 1 }),
		});
	};

	const handleOpenEdit = (id: string) => {
		navigate({
			search: (prev) => ({ ...prev, editId: id }),
		});
	};

	const handleCloseEdit = () => {
		navigate({
			search: (prev) => {
				const { editId: _, ...rest } = prev;
				return rest;
			},
		});
	};

	const handleOpenCreate = () => {
		navigate({
			search: (prev) => ({ ...prev, isCreating: true }),
		});
	};

	const handleCloseCreate = () => {
		navigate({
			search: (prev) => {
				const { isCreating: _, ...rest } = prev;
				return rest;
			},
		});
	};

	const handleDelete = (id: string) => {
		deleteMutation.mutate(id);
	};

	const handleRestore = (id: string) => {
		restoreMutation.mutate(id);
	};

	return {
		// State
		transactions,
		page,
		totalPages,
		type,
		editId,
		isCreating,
		editingTransaction,
		isLoading: query.isLoading,
		isError: query.isError,
		isDeleting: deleteMutation.isPending,
		isRestoring: restoreMutation.isPending,

		// Actions
		handlePageChange,
		handleTypeChange,
		handleOpenEdit,
		handleCloseEdit,
		handleOpenCreate,
		handleCloseCreate,
		handleDelete,
		handleRestore,
	};
}
