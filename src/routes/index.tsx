import { createFileRoute } from "@tanstack/react-router";
import { TranscationList } from "@/components/Transactions/TransactionList";
import { transactionsSearchSchema } from "@/viewmodels";

export const Route = createFileRoute("/")({
	validateSearch: (search) => transactionsSearchSchema.parse(search),
	component: IndexPage,
});

function IndexPage() {
	return <TranscationList />;
}
