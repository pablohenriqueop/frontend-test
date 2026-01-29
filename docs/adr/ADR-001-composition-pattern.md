# ADR 001 - Adoção do Padrão de Composição (Composition Pattern) para Componentes de UI

**Status:** Aceito  
**Data:** 29 de Janeiro de 2026  
**Autor:** Pablo

## Contexto

No desenvolvimento de interfaces de usuário ricas e interativas, frequentemente me deparo com componentes complexos como Tabelas (`Table`) e Caixas de Diálogo (`Dialog` / Modais).

Uma abordagem comum é criar "Mega Componentes" que aceitam dezenas de propriedades (`props`) para configurar cada detalhe interno (cabeçalho, rodapé, ações, conteúdo, estilos de linha, etc.). Isso leva a:
- **Prop Drilling:** Passar propriedades por múltiplos níveis.
- **API Rígida:** Dificuldade em alterar a estrutura interna sem quebrar a API ou adicionar flags booleanas (`hasHeader`, `showFooter`, etc.).
- **Manutenção Difícil:** O componente cresce indefinidamente, tornando-se um monólito difícil de testar e refatorar.

## Decisão

Decidi adotar o **Padrão de Composição (Composition Pattern)** para a construção de componentes de UI estruturais, especificamente exemplificado nos componentes `Table` e `Dialog`.

Em vez de:
```tsx
<Table data={...} columns={...} onRowClick={...} ... />
```

Utilizo:
```tsx
<Table.Root>
  <Table.Header>...</Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>...</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

## Detalhes da Implementação

Os componentes são exportados como um objeto contendo suas sub-partes funcionais. Cada sub-parte é um componente React independente que pode receber seus próprios `children` e `props`.

- **Componentes Afetados:** `Table`, `Dialog` (baseado no Radix UI), `Pagination` (parcialmente).
- **Semântica:** Refatorei esses componentes para usar tags HTML semânticas (`table`, `tr`, `td`) ou atributos ARIA corretos, mantendo a flexibilidade de estilo via Tailwind CSS.

## Consequências

### Positivas
1.  **Flexibilidade:** O consumidor do componente tem controle total sobre a ordem e presença dos elementos filhos. É trivial adicionar um ícone extra em uma célula ou remover o cabeçalho sem alterar o componente base.
2.  **Legibilidade:** A estrutura do JSX reflete visualmente a estrutura do DOM resultante, facilitando o entendimento do layout.
3.  **Separação de Responsabilidades:** O componente "Pai" (Root) não precisa saber os detalhes de implementação dos filhos.
4.  **Menor Superfície de API:** Redução drástica na quantidade de `props` de configuração necessárias.

### Negativas
1.  **Verbosidade:** O código do consumidor (onde o componente é usado) fica mais extenso, pois é necessário declarar explicitamente todas as partes.
2.  **Consistência Visual:** Dá liberdade para o desenvolvedor montar a tabela de forma "errada" (ex: esquecer o `Table.Body`), o que exige disciplina ou abstrações superiores (patterns de uso) para manter a consistência.

## Alternativas Consideradas

- **Configuração via Objeto (Data-Driven):** Passar arrays de objetos para renderizar a tabela. Rejeitei por limitar a customização de renderização (exigiria slots/render props complexos) e acoplar a UI aos dados de forma rígida.

## Referências

- [React Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)
- [Radix UI Primitives](https://www.radix-ui.com/) (Fortemente baseado neste modelo)
