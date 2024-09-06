import { useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Authorization } from './authorization'
import { User } from './dashboard/user'
import { Users } from './dashboard/users'
import { data } from './services/toast'
import { Toast } from 'primereact/toast'

import 'primereact/resources/themes/lara-light-cyan/theme.css'
import './style.css'

const router = createBrowserRouter( [
	{ path: '/authorization', element: <Authorization /> },
	{ path: '/user', element: <User /> },
	{ path: '/users', element: <Users /> },
	{ path: '*', element: <Navigate to='/users' /> }
] )

const App = ( ) => {
	data.ref = useRef( null )
	return (
		<>
			<Toast ref={ data.ref } />
			<RouterProvider router={ router } />
		</>
	)
}

const root = document.getElementById( 'root' )

if ( root ) {
	createRoot( root ).render( <App /> )
}