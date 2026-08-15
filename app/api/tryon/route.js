import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { generateTryonWithIDMVton } from '@/lib/idmVton'
import { cleanupTempFiles, writeFormFileToTemp } from '@/lib/tempFiles'
import TryonHistory from '@/models/TryonHistory'
import crypto from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

function isFileLike(value) {
  return Boolean(value) && typeof value === 'object' && typeof value.arrayBuffer === 'function'
}

export async function POST(request) {
  const tempFiles = []

  try {
    const formData = await request.formData()
    const humanImage = formData.get('humanImage')
    const garmentImage = formData.get('garmentImage')

    if (!isFileLike(humanImage) || !isFileLike(garmentImage)) {
      return NextResponse.json(
        { error: 'Both humanImage and garmentImage are required' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.has(humanImage.type) || !ALLOWED_TYPES.has(garmentImage.type)) {
      return NextResponse.json(
        { error: 'Only JPG, PNG, and WEBP images are allowed' },
        { status: 400 }
      )
    }

    const maxSize = 10 * 1024 * 1024
    if (humanImage.size > maxSize || garmentImage.size > maxSize) {
      return NextResponse.json({ error: 'Each image must be under 10MB' }, { status: 400 })
    }

    const humanImagePath = await writeFormFileToTemp(humanImage, 'human')
    const garmentImagePath = await writeFormFileToTemp(garmentImage, 'garment')
    tempFiles.push(humanImagePath, garmentImagePath)

    const { outputImage } = await generateTryonWithIDMVton({
      humanImagePath,
      garmentImagePath
    })

    const requestId = crypto.randomUUID()

    await connectDB()
    await TryonHistory.create({ requestId, outputImage })

    return NextResponse.json({ outputImage }, { status: 200 })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await cleanupTempFiles(tempFiles)
  }
}
