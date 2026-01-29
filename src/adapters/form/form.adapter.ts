import type { z } from "zod";

export interface FormFieldState {
	invalid: boolean;
	isDirty: boolean;
	isTouched: boolean;
	error?: string;
}

export interface FormState {
	isDirty: boolean;
	isValid: boolean;
	isSubmitting: boolean;
	isSubmitted: boolean;
	errors: Record<string, { message?: string }>;
}

export interface UseFormReturn<T extends Record<string, unknown>> {
	watch: <K extends keyof T>(name: K) => T[K];
	setValue: <K extends keyof T>(name: K, value: T[K]) => void;
	getValues: () => T;
	reset: (values?: Partial<T>) => void;
	register: (name: keyof T) => {
		name: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
		ref: React.RefCallback<HTMLInputElement>;
	};
	handleSubmit: (
		onValid: (data: T) => void,
	) => (e?: React.BaseSyntheticEvent) => Promise<void>;
	formState: FormState;
}

export interface UseFormOptions<T extends Record<string, unknown>> {
	schema: z.ZodSchema<T>;
	defaultValues: T;
}

export interface FormAdapter {
	useForm: <T extends Record<string, unknown>>(
		options: UseFormOptions<T>,
	) => UseFormReturn<T>;
}
