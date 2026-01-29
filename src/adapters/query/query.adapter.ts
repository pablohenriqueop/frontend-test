export interface QueryOptions<T> {
	queryKey: readonly unknown[];
	queryFn: () => Promise<T>;
	enabled?: boolean;
}

export interface QueryResult<T> {
	data: T | undefined;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	refetch: () => void;
}

export interface MutationOptions<TData, TVariables> {
	mutationFn: (variables: TVariables) => Promise<TData>;
	onSuccess?: (data: TData, variables: TVariables) => void;
	onError?: (error: Error, variables: TVariables) => void;
}

export interface MutationResult<TData, TVariables> {
	mutate: (variables: TVariables) => void;
	mutateAsync: (variables: TVariables) => Promise<TData>;
	data: TData | undefined;
	isPending: boolean;
	isError: boolean;
	error: Error | null;
	reset: () => void;
}

export interface QueryClient {
	invalidateQueries: (options: { queryKey: readonly unknown[] }) => void;
}

export interface QueryAdapter {
	useQuery: <T>(options: QueryOptions<T>) => QueryResult<T>;
	useMutation: <TData, TVariables>(
		options: MutationOptions<TData, TVariables>,
	) => MutationResult<TData, TVariables>;
	useQueryClient: () => QueryClient;
}
