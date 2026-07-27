// @vsc repo:vsc-project-169-frontend file:src/components/posts/PostCard.tsx task:f7-src-components-posts-postcard-tsx module:frontend session:169
import { Link } from 'react-router-dom';
import Card from '../../ui/Card';
import { formatDateFa } from '../../utils/formatDateFa';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    author?: {
      name?: string | null;
    };
    createdAt?: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const excerpt = post.content.slice(0, 100);
  const authorName = post.author?.name ?? 'ناشناس';
  const formattedDate = formatDateFa(post.createdAt ?? '');

  return (
    <Link
      to={`/posts/${post.id}`}
      className="block"
    >
      <Card
        className="bg-white border border-gray-2_rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="p_6">
          <h3
            className="text-xl font-semibold text-gray-_8_ line-clamp_"
          >
            {post.title}
          </h3>
          <p className="mt_ _text-gray-_ _text-sm line-clamp_">
            {excerpt}
          </p>
          <div className="mt_ _flex items-center text-_xs text-_gray-_ _space-x-_">
            <span>{authorName}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
