import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export function UserMiddleware( req: Request, res: Response, next: NextFunction ) {

	try {
		console.log( req.path )

		const token = req.headers.authorization.split( ' ' )[ 1 ]
		//if ( !token ) return res.status( 401 ).json( { message: 'Access denied. No token provided.', error: true } )
		//const decoded = verify( token, process.env.EXPRESS_JWT )
		//req.email = decoded.email

		next( )

	} catch ( error ) {

		//return res.status( 403 ).json( { message: 'Invalid or expired token.', error: true } )

	}

}