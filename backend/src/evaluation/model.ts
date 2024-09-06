import { model, models, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export const Evaluation = models[ 'Evaluation' ] || model( 'Evaluation', new Schema( {
	id: { type: String, default: ( ) => uuidv4( ), unique: true },
	name: { type: String, required: true, maxlength: 50, unique: true },
	description: { type: String, maxlength: 200 },
	status: { type: Boolean, default: true },
	timestamp: { type: Date, default: Date.now }
} ) )

export const Question = models[ 'Question' ] || model( 'Question', new Schema( {
	id: { type: String, required: true },
	name: { type: String, required: true },
	timestamp: { type: Date, default: Date.now }
} ) )