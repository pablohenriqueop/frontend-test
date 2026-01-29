export interface HttpRequestConfig {
	headers?: Record<string, string>;
	params?: Record<string, string>;
}

export interface HttpResponse<T> {
	data: T;
	status: number;
}

export interface HttpAdapter {
	get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
	post<T>(
		url: string,
		data?: unknown,
		config?: HttpRequestConfig,
	): Promise<HttpResponse<T>>;
	put<T>(
		url: string,
		data?: unknown,
		config?: HttpRequestConfig,
	): Promise<HttpResponse<T>>;
	patch<T>(
		url: string,
		data?: unknown,
		config?: HttpRequestConfig,
	): Promise<HttpResponse<T>>;
	delete<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
}
