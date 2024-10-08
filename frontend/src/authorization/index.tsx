import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useForm } from '../services/form'
import { Request } from '../services/request'
import { Toast } from '../services/toast'

import { Button } from 'primereact/button'
import { Input } from '../components/input'
import { Device } from '../services/device'
import { Image } from 'primereact/image'

import Logo from '../../assets/icon.png'

export const Authorization = ( ) => {
	const navigate = useNavigate( )
	const isMobile = Device( )
	const [ signInOrUp, setSignInOrUp ] = useState( false )

	const [ form, onSubmit ] = useForm( {
		email: {
			type: 'text',
			required: { value: true, message: 'Required' },
			pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: 'Invalid' }
		},
		password: {
			type: 'password',
			required: { value: true, message: 'Required' },
			minLength: { value: 6, message: 'Min 6 characters' }
		},
		'repeat password': {
			type: 'password',
			required: { value: true, message: 'Required' },
			validate: value => value === form.getValues( 'password' ) || 'Not match' 
		}
	} )

	useEffect( ( ) => {
		form.reset( { email: '', password: '', 'repeat password': '' } )
	}, [ signInOrUp ] )

	const signedIn = async ( data ) => {
		const res = await Request( '/signin', 'POST', data )
		Toast( 'sucesss', 'Sign In', res.message )
		console.log( res )
		if ( !res.error ) {
			localStorage.setItem( 'token', res.token )
			setTimeout( () => {
				navigate( '/users' )
			}, 2000 )
		}
	}

	const signedUp = async ( data ) => {
		const res = await Request( '/signup', 'POST', data )
		if ( !res.error ) {
			Toast( 'sucesss', 'Sign Up', res.message )
			setSignInOrUp( !signInOrUp )
		}
	}	

	return (
		<div style={ { display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh', padding: isMobile ? 10 : 50, background: '#f6f6f6 ' } }>

			<div style={ { display: 'flex', width: '100%', alignItems: 'center', padding: '5%', justifyContent: 'center' } }>
				<Image src={ Logo } width={ isMobile ? '300' : '550' } />
			</div>

			<div style={ { display: 'flex', flexDirection: 'column', gap: 15, width: '100%', padding: isMobile ? '5%' : '10%', alignItems: 'center', justifyContent: 'center' } }>
				<h1 style={ { color: '#367fa9' } }>{ signInOrUp ? 'SIGN UP' : 'SIGN IN' }</h1>
				<Input label='email' form={ form } />
				<Input label='password' form={ form } />

				{ signInOrUp && <Input label='repeat password' form={ form } /> }

				<p onClick={ ( ) => setSignInOrUp( !signInOrUp ) } style={ { color: '#367fa9', fontWeight: 'bold', cursor: 'pointer' } }>{ `${ signInOrUp ? 'Already' : 'Doesnt' } have an account?` }</p>

				<Button label='Submit' onClick={ onSubmit( signInOrUp ? signedUp : signedIn ) } style={ { width: '100%', background: '#367fa9' } } />
			</div>

		</div>
	)
}