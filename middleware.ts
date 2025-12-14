import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // This is called when authentication passes
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

export const config = {
  matcher: ['/admin/dashboard'],
};
