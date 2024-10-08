import express, { Express, Request, Response, NextFunction } from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'

import { SeedAdmin } from './user/seed'
import { SignUp } from './user/signup'
import { SignIn } from './user/signin'
import { UserMiddleware } from './user/middleware'
import { getUsers } from './user/getUsers'

config( )

const { EXPRESS_ORIGIN, EXPRESS_PORT, MONGODB_HOST, MONGODB_PORT, MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_DATABASE } = process.env

const app: Express = express( )

app.use( express.json( ) )	
app.use( ( req: Request, res: Response, next: NextFunction ) => {
	res.set( {
		'Access-Control-Allow-Origin': [ EXPRESS_ORIGIN ],
		'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization'
	} )
	next( )
} )

app.get( '/', ( req, res ) => res.send( '360 Feedback!' ) )
app.post( '/signup', SignUp )
app.post( '/signin', SignIn )

//app.use( UserMiddleware )
app.get( '/users', getUsers )

connect( `mongodb://${ MONGODB_USERNAME }:${ MONGODB_PASSWORD }@${ MONGODB_HOST }:${ MONGODB_PORT }/${ MONGODB_DATABASE }?authSource=admin` ).then( ( ) => {
	SeedAdmin( )
} )

app.listen( EXPRESS_PORT )