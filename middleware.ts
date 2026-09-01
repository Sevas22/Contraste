import { NextResponse, type NextRequest } from 'next/server'

const SESSION_COOKIE = 'contraste_session'

/**
 * Primera capa de protección del panel: rechaza en el borde cualquier petición
 * a /admin sin cookie de sesión, antes de tocar la base de datos.
 *
 * Sólo comprueba la PRESENCIA de la cookie, porque el middleware corre en el
 * runtime Edge y no tiene node:crypto para verificar la firma. La validación
 * real la hace `app/admin/layout.tsx` con getSession(). Una cookie falsificada
 * pasa de aquí pero muere ahí.
 */
export function middleware(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/login'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*'],
}
