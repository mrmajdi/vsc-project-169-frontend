// @vsc repo:vsc-project-169-frontend file:src/pages/Home/index.tsx task:f8-src-pages-home-index-tsx module:frontend session:169
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/ui/Spinner";
import { PostCard } from "@/components/posts/PostCard";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatNumberFa } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const {
    data: postsData,
    isLoading,
    error,
    refetch,
  } = usePosts({ page: 1, limit: 10, published: true });
  const { user } = useAuth();

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-8 flex items-center justify-center min-h-[calc(100vh_-_header_-_footer)]">
          <Spinner className="h-[3rem] w-[3rem]" aria-label="بارگذاری" />
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-8">
          <Card className="bg-danger-50 text-danger-600 border-danger-200">
            <p className="mb-{4}">{error}</p>
            <Button variant="ghost" onClick={() => refetch()}>
              تلاش مجدد
            </Button>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

  const posts = postsData?.posts ?? [];
  const currentPage = postsData?.page ?? 1;
  const totalPages = postsData?.totalPages ?? 0;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-[32px]">
        {(user ?? null) && (
          <div className="flex w-full items-center justify-end mb-[32px]">
            {/* Full-width on mobile, auto width on desktop */}
            <Button variant="primary" onClick={() => navigate("/posts/create")}>
              ایجاد پست جدید
            </Button>
          </div>
        )}

        {(posts.length === 0) ? (
          <>
            {/* Empty state */}
            {/* Centered content */}
          </>
        ) : (
          <>
            {/* Posts grid */}
          </>
        )}
      </main>
      <Footer />
    </>
);
}
