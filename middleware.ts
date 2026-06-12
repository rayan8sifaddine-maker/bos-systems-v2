import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/dashboard')) return NextResponse.next()

  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
      const loginUrl = new URL('/connexion', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: String(e), secret: !!process.env.NEXTAUTH_SECRET }), { status: 500, headers: { 'content-type': 'application/json' } })
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
