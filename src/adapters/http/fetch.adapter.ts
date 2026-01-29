import type {
	HttpAdapter,
	HttpRequestConfig,
	HttpResponse,
} from "./http.adapter";

export class FetchAdapter implements HttpAdapter {
	private baseUrl: string;

	constructor(baseUrl: string = "") {
		this.baseUrl = baseUrl;
	}

	private buildUrl(url: string, params?: Record<string, string>): string {
		const fullUrl = `${this.baseUrl}${url}`;

		if (!params || Object.keys(params).length === 0) {
			return fullUrl;
		}

		const searchParams = new URLSearchParams(params);
		return `${fullUrl}?${searchParams}`;
	}

	private async request<T>(
		url: string,
		options: RequestInit,
		config?: HttpRequestConfig,
	): Promise<HttpResponse<T>> {
		const fullUrl = this.buildUrl(url, config?.params);

		const response = await fetch(fullUrl, {
			...options,
			headers: {
				"Content-Type": "application/json",
				...config?.headers,
				...options.headers,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}

		const data = await response.json();

		return {
			data,
			status: response.status,
		};
	}

	async get<T>(
		url: string,
		config?: HttpRequestConfig,
	): Promise<HttpResponse<T>> {
		return this.request<T>(url, { method: "GET" }, config);
	}

	async post<T>(
		url: string,
		data?: unknown,
		config?: HttpRequestConfig,
	): Promise<HttpResponse<T>> {
		return this.request<T>(
			url,
			{
				method: "POST",
				body: data ? JSON.stringify(data) : undefined,
			},
			config,
		);
	}

	async put<T>(
		url: string,
		data?: unknown,
		config?: HttpRequestConfig,
	): Promise<HttpResponse<T>> {
		return this.request<T>(
			url,
			{
				method: "PUT",
				body: data ? JSON.stringify(data) : undefined,
			},
			config,
		);
	}

	async patch<T>(
		url: string,
		data?: unknown,
		config?: HttpRequestConfig,
	): Promise<HttpResponse<T>> {
		return this.request<T>(
			url,
			{
				method: "PATCH",
				body: data ? JSON.stringify(data) : undefined,
			},
			config,
		);
	}

	async delete<T>(
		url: string,
		config?: HttpRequestConfig,
	): Promise<HttpResponse<T>> {
		return this.request<T>(url, { method: "DELETE" }, config);
	}
}
