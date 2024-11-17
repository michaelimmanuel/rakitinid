// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req : any) {
  const token = req.cookies.get('token');
  const url = req.nextUrl;

  // Bypass redirection if the user is accessing /admin/login
  if (url.pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (url.pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  // If no token is found and the path starts with /admin, redirect to /admin/login
  if (!token && url.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // // disallow put, post, delete requests if no token is found
  // if (!token && (req.method === 'PUT' || req.method === 'POST' || req.method === 'DELETE')) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  // Allow access if the token is present or for other paths
  return NextResponse.next();
}

// Apply middleware only to routes under /admin
export const config = {
  matcher: ['/admin/:path*'],
};
