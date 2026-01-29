import { type Page, expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

test.describe("Transaction Management", () => {
	test.beforeAll(() => {
		const dbPath = path.join(process.cwd(), "backend/db.json");
		fs.writeFileSync(dbPath, JSON.stringify({ transactions: [] }, null, 2));
	});

	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	const closeToast = async (page: Page) => {
		const closeButton = page.locator("[toast-close]").first();
		if (await closeButton.isVisible()) {
			await closeButton.click();
		}
	};

  test('should create a transaction', async ({ page }) => {
    const amount = '100,01'; 
    
    await page.getByRole('button', { name: 'Novo valor' }).click();
    await expect(page.getByText('Quanto você quer adicionar?')).toBeVisible();

    const amountInput = page.getByPlaceholder('0,00');
    await amountInput.fill(amount);
    await page.getByRole('button', { name: 'Entrada' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText('Valor de entrada adicionado').first()).toBeVisible();
    await closeToast(page);
    
    await expect(page.getByText(amount)).toBeVisible();
  });

  test('should list transactions', async ({ page }) => {
    const amount = '200,02';
    
    await page.getByRole('button', { name: 'Novo valor' }).click();
    await page.getByPlaceholder('0,00').fill(amount);
    await page.getByRole('button', { name: 'Salvar' }).click();
    
    await expect(page.getByText('Valor de entrada adicionado').first()).toBeVisible();
    await closeToast(page);

    await expect(page.getByText(amount)).toBeVisible();
  });

  test('should filter transactions', async ({ page }) => {
    const incomeAmount = '300,10';
    await page.getByRole('button', { name: 'Novo valor' }).click();
    await page.getByPlaceholder('0,00').fill(incomeAmount);
    await page.getByRole('button', { name: 'Entrada' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText('Valor de entrada adicionado').first()).toBeVisible();
    await closeToast(page);

    const outcomeAmount = '300,20';
    await page.getByRole('button', { name: 'Novo valor' }).click();
    await page.getByPlaceholder('0,00').fill(outcomeAmount);
    await page.getByRole('button', { name: 'Saída' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText('Valor de saída adicionado').first()).toBeVisible();
    await closeToast(page);

    await page.getByRole('button', { name: 'Entradas' }).click();
    await expect(page.getByText(incomeAmount)).toBeVisible();
    await expect(page.getByText(outcomeAmount)).not.toBeVisible();

    await page.getByRole('button', { name: 'Saídas' }).click();
    await expect(page.getByText(outcomeAmount)).toBeVisible();
    await expect(page.getByText(incomeAmount)).not.toBeVisible();
    
    await page.getByRole('button', { name: 'Todos' }).click();
    await expect(page.getByText(incomeAmount)).toBeVisible();
    await expect(page.getByText(outcomeAmount)).toBeVisible();
  });

  test('should edit a transaction', async ({ page }) => {
    const initialAmount = '400,00';
    const newAmount = '450,50';

    await page.getByRole('button', { name: 'Novo valor' }).click();
    await page.getByPlaceholder('0,00').fill(initialAmount);
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText('Valor de entrada adicionado').first()).toBeVisible();
    await closeToast(page);

    await page.getByText(initialAmount).click();
    await expect(page.getByRole('heading', { name: 'Valor' })).toBeVisible();
    
    await page.getByPlaceholder('0,00').fill(newAmount);
    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText('Valor de entrada atualizado').first()).toBeVisible();
    await closeToast(page);

    await expect(page.getByText(initialAmount)).not.toBeVisible();
    await expect(page.getByText(newAmount)).toBeVisible();
  });

  test('should restore a deleted transaction', async ({ page }) => {
    const amount = '500,55';

    await page.getByRole('button', { name: 'Novo valor' }).click();
    await page.getByPlaceholder('0,00').fill(amount);
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText('Valor de entrada adicionado').first()).toBeVisible();
    await closeToast(page);

    // Use semantic row role now that the table is accessible
    const row = page.getByRole('row').filter({ hasText: amount });
    
    await row.getByRole('button').click(); 
    await expect(row).not.toBeVisible();

    await page.getByRole('button', { name: 'Excluídos' }).click();
    
    const deletedRow = page.getByRole('row').filter({ hasText: amount });
    await expect(deletedRow).toBeVisible();
    
    await deletedRow.getByRole('button', { name: 'Restaurar' }).click();
    
    await expect(page.getByText('Valor restaurado').first()).toBeVisible();
    await closeToast(page);

    await expect(deletedRow).not.toBeVisible();

    await page.getByRole('button', { name: 'Todos' }).click();
    await expect(page.getByText(amount)).toBeVisible();
  });
});
