// components/ui/log-panel.tsx
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type LogPanelProps = {
    status: "success" | "error";
    title?: string;
    message: string;
};

export function LogPanel({ status, title, message }: LogPanelProps) {
    const isSuccess = status === "success";

    return (
        <div
            className={cn(
                "relative rounded-xl px-4 py-3 text-sm font-mono whitespace-pre-wrap break-words border",
                isSuccess
                    ? "bg-green-50 text-green-800 border-green-200"
                    : "bg-red-50 text-red-800 border-red-200"
            )}
        >
            <div className="flex items-start gap-2 mb-2">
                {isSuccess ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                )}
                <strong className="text-sm">
                    {title || (isSuccess ? "Success" : "Error")}
                </strong>
            </div>
            <pre className="text-xs leading-snug overflow-x-auto">{message}</pre>
        </div>
    );
}
