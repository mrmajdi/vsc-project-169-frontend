// @vsc repo:vsc-project-169-frontend file:src/components/layout/Header.tsx task:f5-src-components-layout-header-tsx module:frontend session:169
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <header className="bg-white border-b border-gray-[var(--border)] px-[var(--spacing--6)] py-[var(--spacing--4)] flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-[var(--spacing--2)]">
        <img src="/logo.svg" alt="لوگو" className="h-[var(--size--8)] w-auto" />
        <span className="font-semibold text-[var(--primary--600)]">نام برنامه</span>
      </Link>

      {/* Navigation links */}
      <nav className="hidden md:flex space-x-[var(--spacing--4)]">
        <Link
          to="/"
          className=
            "text-[var(--text--secondary)] hover:text-[var(--primary--60)] transition-colors"
          aria-label="صفحه اصلی"
        >
          خانه
        </Link>
        <Link
          to="/posts"
          className=
            "text-[var(--text--secondary)] hover:text-[var(--primary--60)] transition-colors"
          aria-label="پست‌ها"
        >
          پست‌ها
        </Link>
      </nav>

      {/* Auth actions */}
      <div className="flex space-x-[var(--spacing--3)]">
        {user ? (
          <>
            <span className="text-[var(--text--secondary)]">
              {user.name ?? user.email}
            </span>
            <button
              onClick={handleLogout}
              className=
                "bg-transparent text-[var(--danger--5) font-medium py-[var(--spacing--2)] px-[var(--spacing--3)] rounded-md hover:bg-[var(--danger--5] focus-visble:outline-none focus-visble:ring-[focus-visble:ring-danger] disabled:[disabled]"
              aria-label="خروج"
            >
              خروج
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className=
                "bg-transparent text-[var(--primary--5] font-medium py-[var(--spacing--2)] px-[var(--spacing--3)] rounded-md hover:bg-[primary] focus-visble:none focus-visble:ring-disabled:[disabled]"
              aria-label="ورود"
            >
              ورود
            </Link>
            <Link
              to="/register"
              className=
                "bg-transparent text-[primary] font-medium py-spacing-spacing spacing-spacing rounded-md hover-bg primary-focus visble-outline-none visble-ring-disabled:[disabled]"
              aria-label="ثبت نام"
            >
              ثبت نام
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
