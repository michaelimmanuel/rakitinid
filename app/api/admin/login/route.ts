import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation'
const user = "rakitinlah21";
const pw = "rakitinlah99s";

export async function POST(req : any) {
  // Parse the request body
  const { username, password } = await req.json();

  // Check credentials
  if (username === user && password === pw) {
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    // Set a cookie using NextResponse's cookies API
    response.cookies.set('token', 'admin', { maxAge: 60 * 60 * 24 * 7, path: '/' });
    
    return response;
  }
  
  return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
}
