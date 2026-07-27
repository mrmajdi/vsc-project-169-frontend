// @vsc repo:vsc-project-169-frontend file:src/components/posts/PostForm.tsx task:f7-src-components-posts-postform-tsx module:frontend session:169
import React, {useState} from 'react';
import {z} from 'zod';
import {Input} from '../../ui/Input';
import {Textarea} from '../../ui/Textarea';
import {Button} from '../../ui/Button';
import {Spinner} from '../../ui/Spinner';
import {usePosts} from '../../../hooks/usePosts';

interface PostFormProps {
  mode:'create'|'edit';
  postId?:number;
  onSuccess:(postId:number)=>void;
  onError:(msg:string)=>void;
  isSubmitting?:boolean;
}

export default function PostForm({mode='create',postId,onSuccess,onError}: PostFormProps) {
 const [formValues,{title:setTitle ,content:setContent}] =useState<{title:string ;content:string}>({title:'',content:''});
 const [fieldErrors,{titleErr:setTitleErr ,contentErr:setContentErr}] =useState<{title:string ;content:string}>({title:'',content:''});
 const [isSubmittingLocal ,setIsSubmittingLocal]=useState(false);
 const schema=z.object({
    title :z.string().min(3,{message:'عنوان باید حداقل ۳ کاراکتر باشد'}),
    content :z.string().min(10,{message:'محتوا باید حداقل ۱۰ کاراکتر باشد'})
 });
 const{createPost ,updatePost ,isSubmitting}=usePosts();
 const handleSubmit=async(e:any)=>{
    e.preventDefault();
    setTitleErr('');setContentErr('');
    const result=schema.safeParse(formValues);
    if(!result.success){
        result.error.errors.forEach((err:any)=>{
            if(err.path.includes('title'))setTitleErr(err.message);
            if(err.path.includes('content'))setContentErr(err.message);
        });
        return;
    }
    setIsSubmittingLocal(true);
    try{
        if(mode==='create'){
           const newRes=await createRes(formValues.title ,formValues.content);
           if(newRes?.id){
               onSuccess(newRes.id);
           }
        }else{
           await updateRes(postId!,formValues.title ,formValues.content);
           onSuccess(postId!);
        }
    }catch(err:any){
        const msg=err.response?.data?.error || err.message || 'خطای نامشخص';
        onError(msg);
    }finally{
        setIsSubmittingLocal(false);
    }
 };
 async function createRes(title:string ,content:string){
    // Assuming API expects author omitted or handled by backend
    return await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body :JSON.stringify({title ,content})
    }).then(r=>r.json());
 }
 async function updateRes(id:number ,title:string ,content:string){
    return await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body :JSON.stringify({title ,content})
    }).then(r=>r.json());
 }
 return(
    <form className="bg-white rounded-lg shadow-sm p-6 space-y-4" dir="rtl" onSubmit={handleSubmit}>
       <div>
          <label htmlFor="title" className="block text-base font-medium mb-2">عنوان</label>
          <Input
            id="title"
            value={formValues.title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="عنوان را وارد کنید"
            className={fieldErrors.title?'border-danger-500':''}
          />
          {fieldErrors.title && <p className="mt-[2px] text-danger-600 text-xs">{fieldErrors.title}</p>}
       </div>
       <div>
          <label htmlFor="content" className="block text-base font-medium mb-2">محتوا</label>
          <Textarea
            id="content"
            value={formValues.content}
            onChange={(e)=>setContent(e.target.value)}
            rows={4}
            placeholder="محتوا را وارد کنید"
            className={fieldErrors.content?'border-danger-500':''}
          />
          {fieldErrors.content && <p className="mt-[2px] text-danger-600 text-xs">{fieldErrors.content}</p>}
       </div>
       <div className="flex justify-end space-x-[8px]">
          <Button variant="ghost" size="md" type="button" disabled={isSubmittingLocal || isSubmitting}>
             انصراف
          </Button>
          <Button variant="primary" size="md" type="submit" disabled={isSubmittingLocal || isSubmitting}>
             {isSubmittingLocal || isSubmitting ? (
                 <>
                    <Spinner className="h-[1rem] w-[1rem] mr-[4px]" />
                    در حال ارسال...
                 </>
             ) : (
                 mode==='create' ? 'ایجاد پست' : 'به‌روزرسانی پست'
             )}
          </Button>
       </div>
    </form>
 );
}
