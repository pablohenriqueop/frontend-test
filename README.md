# 4PFinance Test

Este projeto é uma aplicação de gerenciamento financeiro desenvolvida como teste técnico. Ele permite criar, listar, editar, excluir e restaurar transações financeiras (entradas e saídas).

## 🚀 Tecnologias

- **Frontend:** React, Vite, Tailwind CSS, TanStack Router, TanStack Query, Radix UI.
- **Backend (Mock):** JSON Server.
- **Testes:** Playwright (E2E), Vitest (Unitários).
- **Linguagem:** TypeScript.
- **Gerenciador de Pacotes:** Bun (recomendado) ou NPM.

## 🛠️ Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Bun](https://bun.sh/) (opcional, mas recomendado para maior velocidade)

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/4pfinance-test.git
cd 4pfinance-test

# Usando Bun
bun install

# Ou usando NPM
npm install
```

### Instalar Navegadores do Playwright

Para rodar os testes E2E, é necessário baixar os binários dos navegadores:

```bash
npx playwright install
```

## ▶️ Como Rodar Localmente

Para a aplicação funcionar corretamente, é necessário rodar o backend (JSON Server) e o frontend simultaneamente.

### 1. Iniciar o Backend (API Mock)

Abra um terminal na raiz do projeto e execute:

```bash
# Usando Bun
bun run server

# Ou usando NPM
npm run server
```
O servidor rodará em `http://localhost:3001`.

### 2. Iniciar o Frontend

Em **outro terminal**, execute:

```bash
# Usando Bun
bun run dev

# Ou usando NPM
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`.

## 🧪 Rodando os Testes

### Testes E2E (Playwright)

O comando de teste E2E está configurado para iniciar automaticamente tanto o **Frontend** quanto o **Backend** caso eles não estejam rodando.

```bash
# Rodar testes em modo headless (console)
bun run test:e2e

# Rodar testes com interface visual interativa
bun run test:e2e:ui
```

### Testes Unitários/Integração (Vitest)

```bash
bun run test
```

A duração padrão dos toasts foi ajustada para 10 segundos.

## 🏗️ Estrutura do Projeto

O projeto segue uma arquitetura baseada em **MVVM (Model-View-ViewModel)** com Adapters:

- **`src/adapters`**: Camada de adaptação para bibliotecas externas (HTTP, Forms, Query).
- **`src/components`**: Componentes React reutilizáveis (UI) e específicos de domínio.
- **`src/models`**: Definições de tipos e esquemas de validação (Zod).
- **`src/routes`**: Definição das rotas da aplicação (TanStack Router).
- **`src/services`**: Comunicação com a API.
- **`src/viewmodels`**: Lógica de estado e negócios, separando a View da lógica.

---
