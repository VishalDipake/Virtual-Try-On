import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  const { id } = params || {}

  return NextResponse.json(
    {
      id: id || null,
      status: 'unsupported',
      message: 'Status polling is not used with IDM-VTON. Submit to POST /api/tryon and use the returned outputImage.'
    },
    { status: 410 }
  )
}
