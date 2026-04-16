import mongoose, { Schema, model, models } from 'mongoose'

export interface INewsletter {
  email: string
  subscribedAt: Date
}

const NewsletterSchema = new Schema<INewsletter>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  subscribedAt: { type: Date, default: Date.now },
})

const Newsletter = models.Newsletter || model<INewsletter>('Newsletter', NewsletterSchema)

export default Newsletter
