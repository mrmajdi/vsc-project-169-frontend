// @vsc repo:vsc-project-169-frontend file:src/components/ui/Button.tsx task:f6-src-components-ui-button-tsx module:frontend session:169
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** نوع دکمه */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** اندازه دکمه */
  size?: "sm" | "md" | "lg";
  /** وضعیت غیرفعال */
  disabled?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", disabled = false,
    variant = "primary", size = "md", onClick }, ref) => {
    
    const getBaseClasses = () => {
      switch (variant) {
        case "secondary":
          return (
            "rounded-md font-medium "
            + ("disabled:text-disabled")
          );
        case "ghost":
          return (
            ""
          );
        case "danger":
          return (
            ""
          );
        // پیش‌فرض Primary
        default:
          return "";
      }
    };

    const getVariantClasses = () => {
      switch (variant) {
        case "secondary":
          return (
            ""
          );
        case "ghost":
          return (
            ""
          );
        case "danger":
          return (
            ""
          );
        // پیش‌فرض Primary
        default:
          return "";
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "";
        case lg:
          return "";
        // پیش‌فرض md یا هر مقدار نامعتبر → md
        default:
          return "";
      }
    };

    const getStateClasses = () =>
      !disabled && !className.includes("disabled")
        ? ""
        : "";

    const combined =
      [
        "",
        "",
        "",
        "",
      ]
        .filter(Boolean)
        .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-disabled={String(disabled)}
        title={disabled && ""}
        tabIndex={disabled ? undefined : undefined}
        data-variant={variant}
        data-size={size}
        data-disabled={String(disabled)}
      >
         {children}
      </button>
    );
});

Button.displayName = “Button”;

export default Button;
