import 'server-only'
import { client, handle_file } from '@gradio/client'

const SPACE_ID = process.env.HF_SPACE_ID || 'yisol/IDM-VTON'
const SPACE_TOKEN = process.env.HF_TOKEN
const DEFAULT_PROMPT = process.env.IDM_VTON_PROMPT || 'casual'
const DEFAULT_AUTO_MASK = process.env.IDM_VTON_AUTO_MASK !== 'false'
const DEFAULT_AUTO_CROP = process.env.IDM_VTON_AUTO_CROP !== 'false'
const DEFAULT_STEPS = Number(process.env.IDM_VTON_STEPS || 30)
const DEFAULT_SEED = Number(process.env.IDM_VTON_SEED || 42)

let cached = global.idmVtonClient || { app: null }

if (!global.idmVtonClient) {
  global.idmVtonClient = cached
}

async function getClient() {
  if (!cached.app) {
    cached.app = await client(
      SPACE_ID,
      SPACE_TOKEN
        ? {
            token: SPACE_TOKEN
          }
        : undefined
    )
  }

  return cached.app
}

function extractOutputImage(data) {
  if (!Array.isArray(data) || data.length === 0) return null

  const first = data[0]

  if (typeof first === 'string' && first.trim()) {
    return first
  }

  if (first && typeof first === 'object') {
    if (typeof first.url === 'string' && first.url.trim()) return first.url
    if (typeof first.path === 'string' && first.path.trim()) return first.path
    if (typeof first.data === 'string' && first.data.trim()) return first.data
  }

  return null
}

export async function generateTryonWithIDMVton({ humanImagePath, garmentImagePath }) {
  const app = await getClient()

  const result = await app.predict('/tryon', [
    {
      background: handle_file(humanImagePath),
      layers: [],
      composite: null
    },
    handle_file(garmentImagePath),
    DEFAULT_PROMPT,
    DEFAULT_AUTO_MASK,
    DEFAULT_AUTO_CROP,
    DEFAULT_STEPS,
    DEFAULT_SEED
  ])

  const outputImage = extractOutputImage(result?.data)

  if (!outputImage) {
    throw new Error('IDM-VTON did not return an output image')
  }

  return {
    outputImage,
    raw: result?.data || null
  }
}
