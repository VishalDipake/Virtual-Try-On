import mongoose from 'mongoose'

const TryonHistorySchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  outputImage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.TryonHistory ||
  mongoose.model('TryonHistory', TryonHistorySchema)
