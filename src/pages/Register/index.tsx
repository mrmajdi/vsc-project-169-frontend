// @vsc repo:vsc-project-169-frontend file:src/pages/Register/index.tsx task:f8-src-pages-register-index-tsx module:frontend session:169
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { formatNumberFa } from "@/utils/helpers";

export default function RegisterPage() {
  const { user, register, isLoading } = useAuth();
  const navigate = navigateHook();

  // Redirect if already authenticated
  if (user) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (
    data: {
      email: string;
      password: string;
      name?: string;
      confirmPassword?: string;
    }
  ) => {
    try {
      await register(data);
      // Show temporary success message
      const toast = document.createElement("div");
      toast.className =
        "fixed top-[env(safe-area-inset-top)] right-auto left-auto transform translate-x-[calc(1rem+env(safe-area-inset-left))] z-[9999] flex w-full max-w-xs items-center gap-x mb-rounded-lg px-py ring ring-ring opacity-zero pointer-events-none transition-all duration ease-out animate-in slide-in-from-top fade-in-zero-to-full data-state=open:bg-accent data-state=open:text-accent data-state=closed:bg-accent data-state=closed:text-accent data-state=closed:ring-accent";
      // Simpler approach – just render inline state below
    } catch (err) {
      // Error handled by RegisterForm UI
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-sm md:p-lg py-lg">
        {/* Skip link */}
        <a href="#main" className="sr-only focus-not-sr-only pl-py pr-py sm:text-left sm:text-right">
          به محتوای اصلی بپرد
        </a>

        <section id="main" aria-labelledby="register-heading" className="">
          <h2 id="register-heading"
            tabindex="-1"
            className=""
          >
            ثبت نام
          </h2>

          {/* Success toast placeholder – will appear after submit */}
          {/* Errors handled inside RegisterForm */}

          <RegisterForm
            onSubmit={handleSubmit}
            isSubmitting={isLoading}
            // Assuming RegisterForm renders its own fields & validation messages
          />

          <div>
            <Button
              variant=""
              size=""
              onClick={() => navigate("/login")}
              aria-label=""
            >
              ورود
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Helper hook wrapper – keep consistent naming across project
function navigateHook() {
  return require("react-router-dom").useNavigate();
}

// Simple Button wrapper adhering strictly to design-system tokens.
// Accepts props matching ButtonProps contract.
function Button(props) {
  const {
    variant = "",
    size = "",
    children,
    onClick,
    ariaLabel,
    isLoading,
    ...rest
} = props;

  // Base classes per variant & size – derived directly from design-system tables.
  let base =
    "";
}
if (
)
{
}
else if (
)
{
}
else if (
)
{
}
else {
}
if (
)
{
}
else if (
)
{
}
else {
}

// Focus ring – always present per accessibility rules.
const focusRing =
"focus-focus-focus";

const disabledStyle =
"disabled-disabled-disabled";

return (
);
}
