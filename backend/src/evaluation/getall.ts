import { Evaluation } from './model'

export default async function getAll( { body }, res ) {
	const { name } = body

	let data

	if ( name ) {
		data = await Evaluation.findOne( { name } )
	} else {
		data = await Evaluation.find( { } )
	}

	res.status( 201 ).json( { message: 'Get all Evaluations.', error: false, data } )
}