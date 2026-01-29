import * as React from "react";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 5000;

type ToastType = "success" | "error" | "info";

export interface ToastData {
	id: string;
	title: string;
	description?: string;
	type?: ToastType;
	icon?: React.ReactNode;
}

type Action =
	| { type: "ADD_TOAST"; toast: ToastData }
	| { type: "REMOVE_TOAST"; id: string }
	| { type: "DISMISS_TOAST"; id: string };

interface State {
	toasts: ToastData[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function addToRemoveQueue(id: string, dispatch: React.Dispatch<Action>) {
	if (toastTimeouts.has(id)) return;

	const timeout = setTimeout(() => {
		toastTimeouts.delete(id);
		dispatch({ type: "REMOVE_TOAST", id });
	}, TOAST_REMOVE_DELAY);

	toastTimeouts.set(id, timeout);
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "ADD_TOAST":
			return {
				...state,
				toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
			};

		case "DISMISS_TOAST":
			return {
				...state,
				toasts: state.toasts.filter((t) => t.id !== action.id),
			};

		case "REMOVE_TOAST":
			return {
				...state,
				toasts: state.toasts.filter((t) => t.id !== action.id),
			};

		default:
			return state;
	}
}

type ToastContextValue = {
	toasts: ToastData[];
	toast: (data: Omit<ToastData, "id">) => void;
	dismiss: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [state, dispatch] = React.useReducer(reducer, { toasts: [] });

	const toast = React.useCallback((data: Omit<ToastData, "id">) => {
		const id = crypto.randomUUID();
		dispatch({ type: "ADD_TOAST", toast: { ...data, id } });
		addToRemoveQueue(id, dispatch);
	}, []);

	const dismiss = React.useCallback((id: string) => {
		dispatch({ type: "DISMISS_TOAST", id });
	}, []);

	const value = React.useMemo(
		() => ({ toasts: state.toasts, toast, dismiss }),
		[state.toasts, toast, dismiss],
	);

	return React.createElement(ToastContext.Provider, { value }, children);
}

export function useToast() {
	const context = React.useContext(ToastContext);

	if (!context) {
		throw new Error("useToast must be used within a ToastContextProvider");
	}

	return context;
}
