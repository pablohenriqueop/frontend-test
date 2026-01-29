import { useEffect } from "react";
import { useForm } from "@/adapters/form";
import { useMutation, useQueryClient } from "@/adapters/query";
import { useToast } from "@/components/ui/useToast";
import { centsToBRL, fromBRL, toBRL } from "@/libs/currency";
import type { Transaction, TransactionFormInput } from "@/models";
import { transactionFormSchema } from "@/models";
import { transactionService } from "@/services/transaction.service";

interface UseTransactionEditViewModelProps {
	transaction: Transaction | undefined;
	onClose: () => void;
}

export function useTransactionEditViewModel({
	transaction,
	onClose,
}: UseTransactionEditViewModelProps) {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const form = useForm<TransactionFormInput>({
		schema: transactionFormSchema,
		defaultValues: {
			type: "income",
			amount: "",
		},
	});

	useEffect(() => {
		if (transaction) {
			form.reset({
				type: transaction.type,
				amount: centsToBRL(transaction.amount),
			});
		}
	}, [transaction, form.reset]);

	const updateMutation = useMutation({
		mutationFn: transactionService.update,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			toast({
				title: "🎉 Valor de entrada atualizado",
				description: "Já pode visualizar na lista.",
			});
			onClose();
		},
	});

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = toBRL(e.target.value);
		form.setValue("amount", formatted);
	};

	const onSubmit = form.handleSubmit((data) => {
		if (!transaction) return;

		const amountInCents = fromBRL(data.amount);
		updateMutation.mutate({
			id: transaction.id,
			type: data.type,
			amount: amountInCents,
		});
	});

	return {
		// Form
		form,
		onSubmit,
		handleAmountChange,

		// State
		isLoading: updateMutation.isPending,
		error: updateMutation.error?.message ?? null,
	};
}
