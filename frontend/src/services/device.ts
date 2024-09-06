import { useEffect, useState } from 'react'

export const Device = ( ) => {
	const [ state, setState ] = useState( window.innerWidth < window.innerHeight )
	const callback = ( ) => setState( window.innerWidth < window.innerHeight )

	useEffect( ( ) => {
		callback( )
		window.addEventListener( 'resize', callback )
	}, [ ] )

	return state
}
