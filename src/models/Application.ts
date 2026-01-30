import mongoose, { Schema, model, models } from 'mongoose'

export interface IApplication {
  userId: mongoose.Types.ObjectId
  companyName: string
  founderName: string
  email: string
  phone?: string
  industry: string
  stage: string
  fundingAmount: string
  description: string
  pitchDeckUrl?: string
  status: 'pending' | 'in-review' | 'approved' | 'rejected'
  reviewedBy?: mongoose.Types.ObjectId
  reviewedAt?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const ApplicationSchema = new Schema<IApplication>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  founderName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  industry: { type: String, required: true },
  stage: { type: String, required: true },
  fundingAmount: { type: String, required: true },
  description: { type: String, required: true },
  pitchDeckUrl: { type: String },
  status: {
    type: String,
    enum: ['pending', 'in-review', 'approved', 'rejected'],
    default: 'pending'
  },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: { type: Date },
  notes: { type: String },
}, {
  timestamps: true
})

const Application = models.Application || model<IApplication>('Application', ApplicationSchema)

export default Application