import { Request, Response } from 'express'
import { hash } from 'bcrypt'
import { User } from './model'

export const HTTP = '/signup'

export default async function SignUp( req: Request, res: Response ) {
	try {

		const { email, password, name } = req.body
		if ( !email || !password || !name ) return res.status( 400 ).json( { message: 'Missing required fields', error: true } )
		
		const index = await User.findOne( { email } )
		if ( index ) return res.status( 409 ).json( { message: 'Email already exists', error: true } )
	
		await User.create( { name, email, password: await hash( password, 10 ) } )

		res.status( 201 ).json( { message: 'Sign up successful', error: false } )

	} catch ( error ) {

		if ( error instanceof Error ) {
			res.status( 500 ).json( { message: error.message, error: true } )
		} else {
			res.status( 500 ).json( { message: 'An unknown error occurred', error: true } )
		}

	}
}