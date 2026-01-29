import { z } from "zod";

export const transactionTypeSchema = z.enum(["income", "outcome"]);

export const transactionFilterSchema = z.enum([
	"all",
	"income",
	"outcome",
	"deleted",
]);
export type TransactionFilter = z.infer<typeof transactionFilterSchema>;

export const transactionSchema = z.object({
	id: z.string(),
	type: transactionTypeSchema,
	amount: z.number().positive(),
	category: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),
	isDeleted: z.boolean().default(false),
});

export type Transaction = z.infer<typeof transactionSchema>;

export type PaginatedResponse<T> = {
	data: T[];
	first: number;
	prev: number | null;
	next: number | null;
	last: number;
	pages: number;
	items: number;
};

export const transactionFormSchema = z.object({
	type: transactionTypeSchema,
	amount: z
		.string()
		.min(1, "O valor é obrigatório")
		.refine((val) => {
			const digits = val.replace(/\D/g, "");
			return Number.parseInt(digits, 10) > 0;
		}, "O valor deve ser maior que zero"),
});

export type TransactionFormInput = z.infer<typeof transactionFormSchema>;
