const API = 'http://localhost:4002'

export const Request = async ( path: string, method: string, body?: any ) => {
	try {
		const options: { method: string, headers: any, body?: any } = { method, headers: { 'Content-Type': 'application/json' } }
		if ( method != 'GET' && body ) options.body = JSON.stringify( body )
		const res = await fetch( `${API}${path}`, options )
		return await res.json( )
	} catch ( err ) {
		return err
	}
}
