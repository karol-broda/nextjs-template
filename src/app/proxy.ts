import { type NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = new Set(['/login', '/register']);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.has(pathname) || pathname.startsWith('/api');

  if (isPublic) {
    return NextResponse.next();
  }

  const session = request.cookies.get('better-auth.session_token') ?? null;
  if (session === null || session.value === '') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
