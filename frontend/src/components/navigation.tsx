import { Device } from '../services/device'
import { useLocation, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRightFromBracket, faChartSimple, faUsers, faRectangleList } from '@fortawesome/free-solid-svg-icons'

export const Navigation = ( ) => {
	const isMobile = Device( )
	const location = useLocation( )
	const navigate = useNavigate( )

	const routes = [
		{ name: 'Users', icon: faUsers, path: '/users' },
		{ name: 'London', icon: faRectangleList, path: '/user' },
		{ name: 'New York', icon: faChartSimple, path: '/1' },
		{ name: 'Istanbul', icon: faHouse, path: '/2' },
		{ name: 'Paris', icon: faHouse, path: '/3' },
	]

	return (
		<div style={ { display: 'flex', flexDirection: 'column', height: '100dvh', background: '#367fa9', width: isMobile ? 65 : 250, padding: 5, color: '#f6f6f6' } }>
			
			{ isMobile ? 
				<div style={ { display: 'flex', flexDirection: 'column' } }>
					<h2 style={ { display: 'flex', justifyContent: 'center', marginBottom: 0 } }>360</h2>
					<div style={ { display: 'flex', fontSize: 10, fontWeight: 'bold', justifyContent: 'center' } }>Feedback</div>
				</div> :
				<h2 style={ { display: 'flex', justifyContent: 'center' } }>{ '360 Feedback' }</h2>
			}

			<div style={ { flexGrow: 1 } } />

			<div style={ { display: 'flex', gap: isMobile ? 45 : 15, flexDirection: 'column' } }>
				{ routes.map( ( { name, icon, path }, index ) =>
					<div
						onClick={ ( ) => navigate( path ) }
						key={ index } 
						style={ { display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', color: location.pathname == path ? '#00FFFF' : '#f6f6f6', cursor: 'pointer' } }>
						<FontAwesomeIcon size='lg' icon={ icon } />
						{ !isMobile && <h4>{ name }</h4> }
					</div>
				) }
			</div>

			<div style={ { flexGrow: 1 } } />
			
			<div style={ { display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' } }>
				<FontAwesomeIcon icon={ faRightFromBracket } size='lg' style={ { paddingBottom: isMobile ? 30 : 0, cursor: 'pointer' } } />
				{ !isMobile && <h4>Logout</h4> }
			</div>

		</div>
	)
}
