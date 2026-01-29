import * as React from "react";
import { cn } from "@/libs/merge";

const TableRoot = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
	<table
		ref={ref}
		className={cn(
			"w-full flex flex-col rounded-(--radius-card) overflow-hidden",
			className,
		)}
		{...props}
	/>
));
TableRoot.displayName = "Table.Root";

const TableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead
		ref={ref}
		className={cn(
			"flex items-center gap-2 p-4 border-b border-neutral-800 border-dashed",
			className,
		)}
		{...props}
	/>
));
TableHeader.displayName = "Table.Header";

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn("flex flex-col w-full", className)}
		{...props}
	/>
));
TableBody.displayName = "Table.Body";

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		ref={ref}
		className={cn(
			"flex items-center justify-between px-6 h-16 border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer w-full text-left",
			"first:rounded-t-(--radius-card) last:rounded-b-(--radius-card)",
			"not-first:border-t-0",
			className,
		)}
		{...props}
	/>
));
TableRow.displayName = "Table.Row";

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn("flex items-center gap-3", className)}
		{...props}
	/>
));
TableCell.displayName = "Table.Cell";

const TableSkeletonRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		ref={ref}
		className={cn(
			"flex items-center justify-between px-6 h-16 border border-neutral-800",
			"first:rounded-t-(--radius-card) last:rounded-b-(--radius-card)",
			"not-first:border-t-0",
			className,
		)}
		{...props}
	/>
));
TableSkeletonRow.displayName = "Table.SkeletonRow";

export const Table = {
	Root: TableRoot,
	Header: TableHeader,
	Body: TableBody,
	Row: TableRow,
	Cell: TableCell,
	SkeletonRow: TableSkeletonRow,
};
