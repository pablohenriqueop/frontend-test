import { DownloadIcon, UploadIcon } from "@radix-ui/react-icons";
import { cn } from "@/libs/merge";
import { useTransactionCreateViewModel } from "@/viewmodels";
import { Button } from "../ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/Dialog";

interface TransactionCreateDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function TransactionCreateDialog({
	open,
	onOpenChange,
}: TransactionCreateDialogProps) {
	const { form, onSubmit, handleAmountChange, isLoading } =
		useTransactionCreateViewModel({
			onSuccess: () => onOpenChange(false),
		});

	const type = form.watch("type");
	const amountError = form.formState.errors.amount?.message;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent position="top">
				<form onSubmit={onSubmit}>
					<div className="flex flex-col gap-4">
						<DialogTitle>Quanto você quer adicionar?</DialogTitle>
						<input
							type="text"
							{...form.register("amount")}
							onChange={handleAmountChange}
							placeholder="0,00"
							className="bg-transparent text-2xl font-normal text-neutral-50 outline-none w-full placeholder:text-neutral-500"
						/>
						{amountError && (
							<span className="text-sm text-pink-600">{amountError}</span>
						)}
					</div>

					<DialogFooter className="mt-6">
						<div className="flex gap-2.5 bg-neutral-800 rounded-[200px] p-1.75">
							<button
								type="button"
								onClick={() => form.setValue("type", "income")}
								className={cn(
									"flex items-center gap-2.5 px-3 py-0.5 rounded-[19px] h-6 text-sm font-medium transition-colors cursor-pointer",
									type === "income"
										? "bg-neutral-700 text-white"
										: "text-white hover:bg-neutral-700",
								)}
							>
								<DownloadIcon className="w-3 h-3" />
								Entrada
							</button>
							<button
								type="button"
								onClick={() => form.setValue("type", "outcome")}
								className={cn(
									"flex items-center gap-2.5 px-3 py-0.5 rounded-[19px] h-6 text-sm font-normal transition-colors cursor-pointer",
									type === "outcome"
										? "bg-neutral-700 text-white"
										: "text-white hover:bg-neutral-700",
								)}
							>
								<UploadIcon className="w-3 h-3" />
								Saída
							</button>
						</div>

						<Button type="submit" variant="brand" disabled={isLoading}>
							{isLoading ? "Salvando..." : "Salvar"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
