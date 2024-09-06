import { Evaluation, Question } from './model'

export async function CreateEvaluation( req, res ) {

	try {

		const { name, description, questions } = req.body
		const index = await Evaluation.findOne( { name } )

		if ( index ) return res.status( 401 ).json( { message: 'Already exist.', error: true } )
	
		const evaluation = await Evaluation.create( { name, description } )

		res.status( 201 ).json( { message: 'Evaluation Created.', error: false } )
	
	} catch ( error ) {

		if ( error instanceof Error ) {
			res.status( 500 ).json( { message: error.message, error: true } )
		} else {
			res.status( 500 ).json( { message: 'An unknown error occurred', error: true } )
		}

	}

}