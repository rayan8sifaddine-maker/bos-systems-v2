import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/dashboard') && !req.auth) {
    const loginUrl = new URL('/connexion', req.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*'],
}
