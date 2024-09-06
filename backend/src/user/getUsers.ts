import { Request, Response } from 'express'

import { User } from './model'

export async function getUsers( req: Request, res: Response ) {
	try {

		const data = User.find( { } )

		res.status( 201 ).json( { message: '', error: false, data } )

	} catch ( error ) {

	}
}