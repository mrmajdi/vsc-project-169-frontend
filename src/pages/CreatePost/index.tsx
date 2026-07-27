// @vsc repo:vsc-project-169-frontend file:src/pages/CreatePost/index.tsx task:f8-src-pages-createpost-index-tsx module:frontend session:169
tsx
disabled:bg-gray-
50 disabled:
cursor-not-
allowed"
              />
              {fieldErrors.content && (
                <p className="mt-
                  p=1" t=
                  ext-sm t=
                  ext-danger-
                  >{fieldE=
                  rrors.content}</p>
               )}
            </div>
            {globalError && (
              <Card className=
                  "bg-danger-
                  >5>text-dangero=
                  >rder-dangero=
                  >rder-dangero=
                  >r-p=4 my=4">
                 >
                 >
                 >
                 >
                 >
                 >
                 >
                 >
                 >
                 >
                 >{globalError}
                 ><Button variant=
                     "ghost" size=
                     ="md" onClick=
                     =>{setGlobalErorr(null)}>
                    retry
                   ></Button></Card></div></form>{showSuccess&&(<Card c=
                    lassnane=
                    ="bg-success-
                    >5>text-success-
                    >r-p=4 mt=4 tex=
                    t-center">
                     پست با موفقیت ایجاد شد!<span cl=
                       assnane=
                       ="bloc k mt=2"><Button var iant=
                       ="ghost" siz e=
                       ="md" onClick=>{navigate(`/posts/${successP ostId}`)}>مشاهده پست</Button></span></Card>))} </di v></main><Fo oter /></>);}export def ault CreateP ostPage;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

```tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import Card from '@/components/ui/Card';
import * as z from 'zod';

export default function CreatePostPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: createPost } = usePosts();

  const [formData, setFormData] = React.useState({ title: '', content: '' });
  const [fieldErrors, setFieldErrors] =
    React.useState<{ title?: string; content?: string }>({});
  const [globalError, setGlobalError] =
    React.useState<string | null>(null);
  const [showSuccess,


setShowSuccess] =
React.useState(false);
const [successPostId,
setSuccessPostId] =
React.useState<number |
null>(null);

const schema =
z.object({
title:
z.string()
.min(3,
{ message:
'عنوان باید '
+ 'حداقل '
+ '۳ کاراکتر '
+ 'باشد' }),
content:
z.string()
.min(10,
{ message:
'محتوا باید '
+ 'حداقل '
+ '۱۰ کاراکتر '
+ 'باشد' }),
});

const handleSubmit =
async (
e:
React.FormEvent
) => {
e.preventDefault();
setFieldErrors({});
setGlobalError(null);
const result =
schema.safeParse(formData);
if (!result.success) {
const errors =
result.error.format();
const newErrors:
typeof fieldErrors =
{};
if (
errors.title?._errors)
newErrors.title =
errors.title._errors[0];
if (
errors.content?._errors)
newErrors.content =
errors.content._errors[0];
setFieldErrors(newErrors);
return;
}
try {
const newPost =
await createPost({
title:
formData.title.trim(),
content:
formData.content.trim(),
});
if (
newPost &&
newPost.id) {
setSuccessPostId(
newPost.id);
setShowSuccess(true);
// Hide after
// three seconds,
// then redirect.
setTimeout(() => {
navigate(
`/posts/${newP ost.id}`);
}, 3_ooo); }
} catch (
err:any) {
// Assume err has response.data.error or message.
const msg =
err.response?.data?.error ??
err.message ??
'خطای نامشخص'
;
setGlobalError(msg); }
};

if (!user) {
// Redirect unauthenticated users.
navigate('/login');
return null;
}

return (
<>
<Header />
<main
classNam e="
container mx-auto px-
4 md:p x -
6 py -
8"
>
<div clas sN ame="
md:w -
96 md:m x -
auto w -
full"
>
<h1 clas sNam e="
text -
2xl f ont -
semi bold m b -
6 tex t -
c ent er"
>
ایجاد پست جدید</h1>

<form onSu bmi t={handleSubmi t}
classN ame="
space -
y -6"
>

<div>

<label htm lFor ="t itle"
classN ame="
bl ock t ext -
lg f ont -s emi b old t ex t -ri ght m b -2"
>

عنوان</l abel>

<In put id ="t itle"

val ue={f ormD ata.ti tl e}

onCh ange={(e ) =>
se tF ormD at a ({
...f ormD at a ,
ti tl e : e .ta rget .v alu e })
}

cl assNa me="
w-f ull b ord er b ord er-g ra y-
3 roun ded-m d p x -3 p y -2 te x t-b ase fo cu s :o ut lin e-n one fo cu s :rin g-
2 fo cu s :rin g-p ri ma ry-

"

/
>

{f ieldEr rors.ti tl e && (<p cl assNa me="
mt -
1 te x t-s m te x t-d an ger-
6 "
>{f ieldEr rors.ti tl e}</p>) }

</d iv>

<div>

<label ht mlFo r ="c ont ent "
classN ame="
bl ock te x t-lg f ont -s emi bo ld te x t-r ig ht m b -2"

>

محتوا</l abel >

<Texta rea id ="c ont ent "

val ue={f ormD ata.c o nt en t }

onCh ange={(e ) =>
se tF ormD at a ({
...f ormD at a ,
c o nt en t : e .ta rget .v alu e })
}

ro ws={4}

cl assNa me="
w-f ull b ord er b ord er-g ra y-
3 roun ded-m d p x -3 p y -2 te x t-b ase fo cu s :o ut lin e-n one fo cu s :rin g-
2 fo cu s :rin g-p ri ma ry-

"

/

>

{f ieldEr rors.c o nt en t && (<p cl assNa me="
mt -
1 te x t-s m te x t-d an ger-
6 "
>{f ieldEr rors.c o nt en t}</p>) }

</d iv>

{g loba lErr or && (<C ard cl assNa me="
bg-d an ger-

5>te x

t-d an ger-

b ord er-d an ger-

b ord er-d an ger-

p=4 my=

4"

>

{g loba lErr or}

<B utton var iant=

"g host "

si ze=

"md"

onC lic k={()=>s etGl ob al Err or(nu ll)}>

تکرار

</B utton >

</C ard >

)}
</f orm >

{s ho wSu cc ess && (<C ard cl assNa me="
bg-s uc ce ss -

5>te x

t-s uc ce ss -

b ord er-s uc ce ss -

p=4 mt=

4 te x

t-c ent er"

>

پست ب ا موفقیت ایجاد شد!<sp an cl assNa me=

"bl oc k mt=

2"

><B utton var iant=

"g host "

si ze=

"md"

onC lic k={()=>n av igat e(

`/pos ts/${su ccess Po stI d}`)}>مشاهده پست</B utton ></sp an ></C ard >

)}
</d iv >

</ma in >

<Fo oter />

</>)

}
