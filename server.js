import express from 'express';
import 'dotenv/config' 	
import db from './Models/connection.js'

import baseRoutes from './Router/indexRoutes.js'
import userRoutes from './Router/userRoutes.js'

const app = express()
const port = process.env.Port || 3000

// Contectar la base de datos
db.authenticate()
	.then(() => console.log('Database Conected'))
	.catch(err => console.log(err))

//* Habilitar pug
app.set('view engine', 'pug')
app.set('views','./Views')

//public
app.use(express.static('Public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', baseRoutes)
app.use('/usr', userRoutes)

app.listen(port, () => {
	console.log(`example app listening on port ${port}`)
})
