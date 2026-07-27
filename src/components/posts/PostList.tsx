// @vsc repo:vsc-project-169-frontend file:src/components/posts/PostList.tsx task:f7-src-components-posts-postlist-tsx module:frontend session:169
src/components/posts/PostList.tsx
```tsx
import React from 'react';
import { Spinner } from '@/components/ui/Spinner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PostCard } from '@/components/posts/PostCard';

interface Post {
  id?: number;
  title?: string;
  content?: string;
  published?: boolean;
  authorId?: number;
  author?: {
    id?: number;
    email?: string;
    name?: string | null | undefined;
    createdAt?: string | undefined | null | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined };
};

interface PostListProps {
  posts?: any[]|null|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|
}
export default function PostList({posts=[],isLoading=false,error=null,onRefresh}:any){
if(isLoading){return(<React.Fragment><Card><Spinner></Spinner></Card></React.Fragment>);}
if(error){return(<React.Fragment><Card><p>{error}</p><Button variant=\"ghost\" onClick={onRefresh}>Retry</Button></Card></React.Fragment>);}
if(!posts||posts.length===0){return(<React.Fragment><Card><p>هنوز پستی موجود نیست.</p><Button variant=\"primary\">ایجاد پست اول</Button</Button></Cart></React.Fragment>);}
return(<React.Fragment><Div>{posts.map((post:any)=> (<PostCart key={post?.id} post={post}/>))}</Div></React.Fragment>);}
