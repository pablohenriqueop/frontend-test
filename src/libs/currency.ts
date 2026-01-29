/**
 * Formata um valor string para moeda brasileira (R$)
 * Remove caracteres não numéricos e formata com separadores
 * @param value - String com dígitos a ser formatada
 * @returns String formatada no padrão brasileiro (ex: "1.234,56")
 */
export function toBRL(value: string): string {
	const digits = value.replace(/\D/g, "");
	if (!digits) return "";

	const numericValue = Number.parseInt(digits, 10);
	return (numericValue / 100).toLocaleString("pt-BR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}

/**
 * Converte uma string formatada em moeda para centavos (inteiro)
 * @param value - String formatada (ex: "1.234,56")
 * @returns Valor em centavos (ex: 123456)
 */
export function fromBRL(value: string): number {
	const digits = value.replace(/\D/g, "");
	return Number.parseInt(digits, 10) || 0;
}

/**
 * Converte centavos para string formatada em moeda brasileira
 * @param cents - Valor em centavos (ex: 123456)
 * @returns String formatada (ex: "1.234,56")
 */
export function centsToBRL(cents: number): string {
	return (cents / 100).toLocaleString("pt-BR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}
