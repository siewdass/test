import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigation } from '../components/navigation'
import { Request } from '../services/request'

export const Users = ( ) => {
	const navigate = useNavigate( )

	const init = async () => {
		const users = await Request( '/users', 'GET' )
		console.log( users )
	}

	useEffect( ( ) => {
		console.log( localStorage.getItem( 'token' ) )
		//if ( localStorage.getItem( 'token' ) == null ) navigate( '/authorization' )
		init( )
	}, [] )

	return (
		<div style={ { display: 'flex', flexDirection: 'row', height: '100vh', background: '#f6f6f6' } }>
			<Navigation />
			users
		</div>
	)
}