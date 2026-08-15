import 'server-only'
import crypto from 'crypto'
import { promises as fs } from 'fs'
import os from 'os'
import path from 'path'

const MIME_TO_EXTENSION = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp'
}

function sanitizeExtension(name, mimeType) {
  const fromName = path.extname(name || '').toLowerCase()

  if (fromName && fromName.length <= 5) {
    return fromName
  }

  return MIME_TO_EXTENSION[mimeType] || '.bin'
}

export async function writeFormFileToTemp(file, prefix) {
  const dir = path.join(os.tmpdir(), 'virtual-tryon-next')
  await fs.mkdir(dir, { recursive: true })

  const extension = sanitizeExtension(file?.name, file?.type)
  const tempPath = path.join(dir, `${prefix}-${crypto.randomUUID()}${extension}`)
  const bytes = Buffer.from(await file.arrayBuffer())

  await fs.writeFile(tempPath, bytes)

  return tempPath
}

export async function cleanupTempFiles(paths) {
  if (!Array.isArray(paths) || paths.length === 0) return

  await Promise.allSettled(
    paths.filter(Boolean).map(async (tempPath) => {
      await fs.unlink(tempPath)
    })
  )
}
