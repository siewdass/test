import { model, models, Schema } from 'mongoose'

const schema = new Schema( {
	//name: { type: String, required: true, maxlength: 50 },
	email: { type: String, required: true, unique: true, maxlength: 255 },
	password: { type: String, required: true },
	role: { type: Number, default: 2 },
	timestamp: { type: Date, default: Date.now }
} )

export const User = models[ 'User' ] || model( 'User', schema )