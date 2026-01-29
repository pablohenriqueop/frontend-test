import { api } from "@/adapters/http/api";
import type { PaginatedResponse, Transaction } from "@/models";

export type TransactionFilterType = "all" | "income" | "outcome" | "deleted";

export interface GetTransactionsParams {
	page: number;
	limit: number;
	type: TransactionFilterType;
}

export interface CreateTransactionParams {
	type: "income" | "outcome";
	amount: number;
}

export interface UpdateTransactionParams {
	id: string;
	type: "income" | "outcome";
	amount: number;
}

export const transactionService = {
	async getAll(
		params: GetTransactionsParams,
	): Promise<PaginatedResponse<Transaction>> {
		const { page, limit, type } = params;

		const queryParams: Record<string, string> = {
			_page: String(page),
			_per_page: String(limit),
		};

		if (type === "income" || type === "outcome") {
			queryParams.type = type;
			queryParams.isDeleted = "false";
		} else if (type === "deleted") {
			queryParams.isDeleted = "true";
		} else {
			queryParams.isDeleted = "false";
		}

		const response = await api.get<PaginatedResponse<Transaction>>(
			"/transactions",
			{ params: queryParams },
		);

		return response.data;
	},

	async getById(id: string): Promise<Transaction> {
		const response = await api.get<Transaction>(`/transactions/${id}`);
		return response.data;
	},

	async create(params: CreateTransactionParams): Promise<Transaction> {
		const now = new Date().toISOString();

		const response = await api.post<Transaction>("/transactions", {
			...params,
			createdAt: now,
			updatedAt: now,
			deletedAt: null,
			isDeleted: false,
		});

		return response.data;
	},

	async update(params: UpdateTransactionParams): Promise<Transaction> {
		const { id, ...data } = params;

		const response = await api.patch<Transaction>(`/transactions/${id}`, {
			...data,
			updatedAt: new Date().toISOString(),
		});

		return response.data;
	},

	async softDelete(id: string): Promise<Transaction> {
		const response = await api.patch<Transaction>(`/transactions/${id}`, {
			deletedAt: new Date().toISOString(),
			isDeleted: true,
		});

		return response.data;
	},

	async restore(id: string): Promise<Transaction> {
		const response = await api.patch<Transaction>(`/transactions/${id}`, {
			deletedAt: null,
			isDeleted: false,
		});

		return response.data;
	},
};
