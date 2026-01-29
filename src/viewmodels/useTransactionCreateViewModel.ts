import { useForm } from "@/adapters/form";
import { useMutation, useQueryClient } from "@/adapters/query";
import { useToast } from "@/components/ui/useToast";
import { fromBRL, toBRL } from "@/libs/currency";
import type { TransactionFormInput } from "@/models";
import { transactionFormSchema } from "@/models";
import { transactionService } from "@/services/transaction.service";

interface UseTransactionCreateViewModelProps {
	onSuccess?: () => void;
}

export function useTransactionCreateViewModel({
	onSuccess,
}: UseTransactionCreateViewModelProps = {}) {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const form = useForm<TransactionFormInput>({
		schema: transactionFormSchema,
		defaultValues: {
			type: "income",
			amount: "",
		},
	});

	const createMutation = useMutation({
		mutationFn: transactionService.create,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			const typeLabel = data.type === "income" ? "entrada" : "saída";
			toast({
				title: `🎉 Valor de ${typeLabel} adicionado`,
				description: "Já pode visualizar na lista.",
			});
			form.reset();
			onSuccess?.();
		},
	});

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = toBRL(e.target.value);
		form.setValue("amount", formatted);
	};

	const onSubmit = form.handleSubmit((data) => {
		const amountInCents = fromBRL(data.amount);
		createMutation.mutate({
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
		isLoading: createMutation.isPending,
		error: createMutation.error?.message ?? null,
	};
}
