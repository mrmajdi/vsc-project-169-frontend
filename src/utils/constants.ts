// @vsc repo:vsc-project-169-frontend file:src/utils/constants.ts task:f9-src-utils-constants-ts module:frontend session:169
export const ROUTES = {
    HOME:'/',
    LOGIN:'/login',
    REGISTER:'/register',
    PROFILE:'/profile',
    CREATE_POST:'/posts/create';
};
Wait there is syntax error due to semicolon inside object literal; need commas between properties and end with semicolon after closing brace? In TS object literal ends with } ; optional semicolon after but inside use commas.
Let's rewrite correctly.


export const ROUTES = {
    HOME:'/',
    LOGIN:'/login',
    REGISTER:'/register',
    PROFILE:'/profile';
};
