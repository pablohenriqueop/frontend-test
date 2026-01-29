import {
	useMutation as useTanstackMutation,
	useQuery as useTanstackQuery,
	useQueryClient as useTanstackQueryClient,
} from "@tanstack/react-query";
import type {
	MutationOptions,
	MutationResult,
	QueryClient,
	QueryOptions,
	QueryResult,
} from "./query.adapter";

export function useQuery<T>(options: QueryOptions<T>): QueryResult<T> {
	const query = useTanstackQuery({
		queryKey: options.queryKey,
		queryFn: options.queryFn,
		enabled: options.enabled,
	});

	return {
		data: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refetch: query.refetch,
	};
}

export function useMutation<TData, TVariables>(
	options: MutationOptions<TData, TVariables>,
): MutationResult<TData, TVariables> {
	const mutation = useTanstackMutation({
		mutationFn: options.mutationFn,
		onSuccess: options.onSuccess,
		onError: options.onError,
	});

	return {
		mutate: mutation.mutate,
		mutateAsync: mutation.mutateAsync,
		data: mutation.data,
		isPending: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		reset: mutation.reset,
	};
}

export function useQueryClient(): QueryClient {
	const queryClient = useTanstackQueryClient();

	return {
		invalidateQueries: (options) => queryClient.invalidateQueries(options),
	};
}
