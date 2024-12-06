import { NextResponse } from 'next/server';

const user = "test";
const pw = "test";

export async function POST(req : any) {
  // Parse the request body
  const { username, password } = await req.json();

  // Check credentials
  if (username === user && password === pw) {
    const response = NextResponse.redirect(new URL('/admin', req.url));
    
    // Set a cookie using NextResponse's cookies API
    response.cookies.set('token', 'admin', { maxAge: 60 * 60 * 24 * 7, path: '/' });
    
    return response;
  }
  
  return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
}
