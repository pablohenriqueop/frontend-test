import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import {
	type DefaultValues,
	type Path,
	type PathValue,
	type SubmitHandler,
	useForm as useReactHookForm,
} from "react-hook-form";
import type { z } from "zod";
import type { UseFormOptions, UseFormReturn } from "./form.adapter";

export function useForm<T extends Record<string, unknown>>(
	options: UseFormOptions<T>,
): UseFormReturn<T> {
	const form = useReactHookForm<T>({
		resolver: zodResolver(options.schema as z.ZodSchema<T>),
		defaultValues: options.defaultValues as DefaultValues<T>,
	});

	const methods = useMemo(
		() => ({
			watch: <K extends keyof T>(name: K) =>
				form.watch(name as unknown as Path<T>) as T[K],
			setValue: <K extends keyof T>(name: K, value: T[K]) =>
				form.setValue(
					name as unknown as Path<T>,
					value as PathValue<T, Path<T>>,
					{ shouldValidate: true },
				),
			getValues: () => form.getValues(),
			reset: (values?: Partial<T>) => form.reset(values as DefaultValues<T>),
			register: (name: keyof T) => form.register(name as unknown as Path<T>),
			handleSubmit: (onValid: SubmitHandler<T>) => form.handleSubmit(onValid),
		}),
		[form],
	);

	return {
		...methods,
		formState: {
			isDirty: form.formState.isDirty,
			isValid: form.formState.isValid,
			isSubmitting: form.formState.isSubmitting,
			isSubmitted: form.formState.isSubmitted,
			errors: form.formState.errors as Record<string, { message?: string }>,
		},
	};
}
