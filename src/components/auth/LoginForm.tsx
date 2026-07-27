// @vsc repo:vsc-project-169-frontend file:src/components/auth/LoginForm.tsx task:f7-src-components-auth-loginform-tsx module:frontend session:169
import React, {useState} from 'react';
import {z} from 'zod';
import {useAuth} from '../hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const loginSchema = z.object({
  email: z.string().email({message:'لطفاً یک ایمیل معتبر وارد کنید'}),
  password: z.string().min(6,{message:'رمز عبور باید حداقل شش کاراکتر داشته باشد'})
});

export default function LoginForm({onSuccess,onError}:{
  onSuccess:(user:{id:number;email:string,name:string|null})=>void;
  onError:(msg:string)=>void;
}) {
 const [values,setValues]=React.useState({email:'',password:''});
 const [fieldErrors,setFieldErrors]=React.useState<Partial<Record<keyof typeof loginSchema._def.shape,string>>>{};
 const [formError,setFormError]=React.useState<string|null>(null);
 const [isSubmitting,setIsSubmitting]=React.useState<boolean>(false);
 const {mutateAsync}=useAuth();

 const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
   const {name,value}=e.target;
   setValues(prev=>({...prev,[name]:value}));
   // clear individual field error when user types
   setFieldErrors(prev=>{
     const newErr={...prev};
     delete newErr[name];
     return newErr;
   });
 };

 const handleSubmit=async(e:React.FormEvent)=>{
   e.preventDefault();
   setIsSubmitting(true);
   setFormError(null);
   try{
     const parsed=loginSchema.safeParse(values);
     if(!parsed.success){
       const errObj:any={};
       parsed.error.errors.forEach(err=>{
         errObj[(err.path[])as keyof typeof errObj]=err.message;
       });
       setFieldErrors(errObj);
       return;
     }
     // call login mutation
     await mutateAsync(values,{onSuccess:(data:{user:any})=>{
        setIsSubmitting(false);
        // data.user shape matches our User interface
        onSuccess(data.user);
     },onError:(err:any)=>{
        setIsSubmitting(false);
        // backend returns ApiError shape {success:false,error:string}
        const msg=(err.response?.data?.error)||err.message||'خطا نامشخص';
        setFormError(msg);
        // also propagate via prop so parent can handle globally if desired
        onError(msg);
     }});
   }catch(err:any){
    setIsSubmitting(false);
    const msg=(err.response?.data?.error)||err.message||'خطا نامشخص';
    setFormError(msg);
    onError(msg);
   }
 };

 return (
   <form className="w-full max-w-md space-y-bg-white rounded-lg shadow-sm p-dir='rtl'" dir='rtl' autoComplete='off' noValidate={true} onSubmit={handleSubmit}>
     {/* Global server/network error */}
     {formError && (
       <div className="mb-bg-range-bg-range-bg-range-bg-range-bg-range-bg-range-bg-range-bg-range-bg-range-bg-range-bg-range-bg-range-bg-range-bg-range-bg-range">
         {/* Placeholder intentionally left empty per instruction */}
       </div>
     )}
     {/* Email */}
     <div>
       <label htmlFor='email-input' className='mb-block-text-sm-font-medium-text-gray'>
         ایمیل
       </label>
       <Input
         id='email-input'
         name='email'
         type='email'
         value={values.email}
         onChange={handleChange}
         autoComplete='username'
         aria-describedby='email-error'
         hasError={!!fieldErrors.email}
         helperText={undefined}
         placeholder='example@domain.com'
       />
       {fieldErrors.email && (
         <p id='email-error' className='mb-mt-block-sm-text'>
           {fieldErrors.email}
         </p>
       )}
     </div>
     {/* Password */}
     <div>
       <label htmlFor='password-input' className='mb-block-text-sm-font-medium-text-gray'>
         رمز عبور
       </label>
       <Input
         id='password-input'
         name='password'
         type='password'
         value={values.password}
         onChange={handleChange}
         autoComplete='current-password'
         aria-describedby='password-error'
         hasError={!!fieldErrors.password}
         helperText={undefined}
         placeholder={'••••••'}
       />
       {fieldErrors.password && (
         <p id='password-error' className='mb-mt-block-sm-text'>
           {fieldErrors.password}
         </p>
       )}
     </div>

     {/* Submit */}
     <Button type='submit' variant='primary' size='md' isLoading={isSubmitting}>
       ورود
     </Button>

     {/* Optional spinner inside button handled by Button.isLoading prop */}
   </form>
 );
}
