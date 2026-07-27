// @vsc repo:vsc-project-169-frontend file:src/hooks/useAuth.ts task:f4-src-hooks-useauth-ts module:frontend session:169
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto {
  email: string;
  password:
    string;
    name?: string;
}

interface User {
    id:number;
    email:string;
    name:string|null | undefined ;
    createdAt:string ;
    updatedAt:string ;
}
interface AuthResponse{
    success:true ;
    user:{id:number ;email:string ;name:string|null} ;
}
interface LogoutResponse{
    success:true ;
    message?:string ;
}
const login=async(creds :LoginDto)=>{
   const{data}=await apiClient.post<AuthResponse>('/auth/login',creds);
   return data ;
};
const register=async(data :RegisterDto)=>{
   const{data}=await apiClient.post<AuthResponse>('/auth/register',data);
   return data ;
};
const logout=async()=>{
   const{data}=await apiClient.post<LogoutResponse>('/auth/logout');
   return data ;
};
export const useAuth=()=>{
   const qc=useQueryClient();
   const{data :user ,isLoading :isLoadingUser}=useQuery<User>({
       queryKey :['auth'],
       queryFn :async()=>{const{data}=await apiClient.get<User>('/auth/me');return data ;},
       staleTime :Infinity ,
   });
   const loginMut=useMutation({mutationFn :login ,onSuccess :()=>{qc.invalidateQueries({queryKey :['auth']});}});
   const regMut=useMutation({mutationFn :register ,onSuccess :()=>{qc.invalidateQueries({queryKey :['auth']});}});
   const logoutMut=useMutation({mutationFn :logout ,onSuccess :()=>{qc.setQueryData(['auth'],null);}});
   const isLoading =isLoadingUser||loginMut.isLoading||regMut.isLoading||logoutMut.isLoading ;
   return{
       user,
       isLoading,
       login :loginMut.mutateAsync,
       register :regMut.mutateAsync,
       logout :logoutMut.mutateAsync ,
   };
};
