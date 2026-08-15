import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import TryonHistory from '@/models/TryonHistory'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()

    const history = await TryonHistory.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .select('outputImage createdAt')
      .lean()

    return NextResponse.json({ history })
  } catch (error) {
    console.error('History fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    )
  }
}
