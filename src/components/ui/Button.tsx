import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    icon?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    title?: string;
}

export default function Button({
    children,
    variant = "primary",
    icon = false,
    type = "button",
    disabled = false,
    className = "",
    title = "",
    ...props
}: ButtonProps) {
    const base =
        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

    const styles: Record<ButtonVariant, string> = {
        primary: "bg-rekany-orange text-white hover:bg-rekany-dark",
        secondary:
            "bg-transparent text-white border-2 border-white/30 hover:border-rekany-light hover:text-rekany-light",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            title={title} // ✅ AJOUTER CELLE-CI
            className={`${base} ${styles[variant]} ${className}`}
            {...props}
        >
            {children}
            {icon && <ArrowRight className="h-4 w-4" />}
        </button>
    );
}