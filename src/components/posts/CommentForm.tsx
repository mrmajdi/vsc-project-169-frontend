// @vsc repo:vsc-project-169-frontend file:src/components/posts/CommentForm.tsx task:f7-src-components-posts-commentform-tsx module:frontend session:169
import React, { useState } from 'react'
import z from 'zod'
import { Textarea } from '../../ui/Textarea'
import { Button } from '../../ui/Button'
import { Spinner } from '../../ui/Spinner'
import { useComments } from '../../hooks/useContracts'

interface Comment {
  id: number
  content: string
  postId: number
  authorId: number
  author: {
    id: number
    email: string
    name?: string | null
  }
  createdAt: string
}

export default function CommentForm({
  postId,
  onSuccess,
  onError,
}: {
  postId: number
  onSuccess: (comment: Comment) => void
  onError?: (message?: string) => void
}) {
 const [content, setContent] = useState('')
 const [validationError, setValidationError] = useState<string | null>(null)
 const [submitPending, setSubmitPending] = useState(false)
 const commentSchema = z.object({
   content: z.string().min(1,'نظر نمی‌تواند خالی باشد')
 })
 const { mutateAsync: createCommentMutation , isLoading} =
   useComments()

 async function handleSubmit(e:any){
   e.preventDefault()
   setValidationError(null)
   const parseResult=commentSchema.safeParse({content})
   if(!parseResult.success){
     setValidationError(parseResult.error.errors[0].message)
     return
   }
   try{
     setSubmitPending(true)
     const newComment=await createCommentMutation({
       postId,
       content,
     })
     setContent('')
     setSubmitPending(false)
     if(onSuccess){
       onSuccess(newComment)
     }
   }
   catch(err:any){
     setSubmitPending(false)
     const message=
       err.response?.data?.error ||
       err.message ||
       'خطا در ارسال نظر'
     if(onError){
       onError(message)
     }
   }
 }

 return(
   <div className='bg-white rounded-lg shadow-sm p-4 space-y-4'>
     <form onSubmit={handleSubmit} className='space-y-3'>
       <div>
         <label htmlFor='comment-content' className='block text-sm font-medium mb-1'>
           نظر شما
         </label>
         <Textarea
           id='comment-content'
           value={content}
           onChange={(e)=>setContent(e.target.value)}
           placeholder='نظر شما'
           rows={3}
           aria-label='نظر شما'
           dir='auto'
           className={
             validationError?'border-danger-500 ring-danger-300':'undefined'
           }
         />
         {(validationError||'' )&&(
           <p className='mt-1 text-xs text-danger-600'>
             {validationError}
           </p>
         )}
       </div>
       <div className='flex justify-end'>
         <Button
           variant='primary'
           size='md'
           isLoading={isLoading||submitPending}
           disabled={isLoading||submitPending||!!validationError}
           type='submit'
         >
           {(isLoading||submitPending)?(
             <>
               <Spinner className='h-4 w-4 mr-2'/>
               در حال ارسال...
             </>
           ):(
             'ارسال'
           )}
         </Button>
       </div>
     </form>
   </div>
 )
}
