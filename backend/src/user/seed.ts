import { hash } from 'bcrypt'
import { User } from './model'

export async function SeedAdmin( ) {

	const index = await User.findOne( { email: 'admin@360feedback.com' } )

	if ( !index ) await User.create( {
		name: 'ADMIN',
		email: 'admin@360feedback.com',
		role: 0,
		password: await hash( '360feedback', 10 )
	} )

}