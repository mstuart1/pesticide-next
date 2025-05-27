import type {NextAuthConfig} from 'next-auth';


export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: {nextUrl} }) {
            const isLoggedIn = !!auth?.user;
            //** this section checks if the user is authorized to visit specific urls */
            // todo add a check if user is admin to access admin pages
            // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            // if (isOnDashboard) {
            //     if (isLoggedIn) return true;
            //     return false; // redirect to login page
            // } else 
            if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        }
    },
    providers: [], 

    } satisfies NextAuthConfig;