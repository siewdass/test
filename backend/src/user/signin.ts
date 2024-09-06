import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { User } from './model'

export const HTTP = '/signin'

export default async function SignIn( req: Request, res: Response ) {
	try {

		const { email, password } = req.body

		if ( !email || !password ) return res.status( 400 ).json( { message: 'Email and password are required.', error: true } )
		
		const user = await User.findOne( { email } )
		if ( !user ) return res.status( 404 ).json( { message: 'User not found.' } )

		const isMatch = await compare( password, user.password )
		if ( !isMatch ) return res.status( 401 ).json( { message: 'Invalid email or password.' } )
		
		const token = sign( { email: user.email }, process.env.EXPRESS_JWT, { expiresIn: '24h' } )

		res.json( { message: 'Successful', error: false, data: { name: user.name, email: user.email, token } } )

	} catch ( error ) {

		if ( error instanceof Error ) {
			res.status( 500 ).json( { message: error.message, error: true } )
		} else {
			res.status( 500 ).json( { message: 'An unknown error occurred', error: true } )
		}

	}
}