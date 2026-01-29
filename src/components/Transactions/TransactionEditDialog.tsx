import { DownloadIcon, UploadIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";
import type { Transaction } from "@/models";
import { useTransactionEditViewModel } from "@/viewmodels";
import { Button } from "../ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/Dialog";

interface TransactionEditDialogProps {
	transaction: Transaction | undefined;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

function InputSkeleton() {
	return <div className="h-8 w-32 bg-neutral-800 rounded animate-pulse" />;
}

function FooterSkeleton() {
	return (
		<>
			<div className="h-9.5 w-45 bg-neutral-800 rounded-[200px] animate-pulse" />
			<div className="h-8 w-24 bg-neutral-800 rounded-pill animate-pulse" />
		</>
	);
}

const toggleVariants = cva(
	"flex items-center gap-2.5 px-3 py-0.5 rounded-[19px] h-6 text-sm font-medium transition-colors cursor-pointer",
	{
		variants: {
			active: {
				true: "bg-neutral-700 text-white",
				false: "text-white hover:bg-neutral-700",
			},
		},
		defaultVariants: {
			active: false,
		},
	},
);

export function TransactionEditDialog({
	transaction,
	open,
	onOpenChange,
}: TransactionEditDialogProps) {
	const { form, onSubmit, handleAmountChange, isLoading } =
		useTransactionEditViewModel({
			transaction,
			onClose: () => onOpenChange(false),
		});

	const isLoadingTransaction = open && !transaction;
	const type = form.watch("type");
	const amountError = form.formState.errors.amount?.message;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent position="top">
				<form onSubmit={onSubmit}>
					<div className="flex flex-col gap-4">
						<DialogTitle>Valor</DialogTitle>
						{isLoadingTransaction ? (
							<InputSkeleton />
						) : (
							<input
								type="text"
								{...form.register("amount")}
								onChange={handleAmountChange}
								placeholder="0,00"
								className="bg-transparent text-2xl font-normal text-neutral-50 outline-none w-full placeholder:text-neutral-500"
							/>
						)}
						{amountError && (
							<span className="text-sm text-pink-600">{amountError}</span>
						)}
					</div>

					<DialogFooter className="mt-6">
						{isLoadingTransaction ? (
							<FooterSkeleton />
						) : (
							<>
								<div className="flex gap-2.5 bg-neutral-800 rounded-[200px] p-1.75">
									<button
										type="button"
										onClick={() => form.setValue("type", "income")}
										className={toggleVariants({ active: type === "income" })}
									>
										<DownloadIcon className="w-3 h-3" />
										Entrada
									</button>
									<button
										type="button"
										onClick={() => form.setValue("type", "outcome")}
										className={toggleVariants({ active: type === "outcome" })}
									>
										<UploadIcon className="w-3 h-3" />
										Saída
									</button>
								</div>

								<Button type="submit" variant="brand" disabled={isLoading}>
									{isLoading ? "Salvando..." : "Salvar"}
								</Button>
							</>
						)}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
