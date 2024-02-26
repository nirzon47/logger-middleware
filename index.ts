import { log } from 'console'
import express from 'express'
import morgan from 'morgan'
import { createWriteStream } from 'fs'

const app = express()

// Create a writable stream
const writableStream = createWriteStream('server.log', { flags: 'a' })

// Use morgan middleware to log requests
app.use(morgan('combined', { stream: writableStream }))

// Route for root
app.get('/', (req, res) => {
	res.send('Hello World!')
})

// Route for user
app.get('/getUser', (req, res) => {
	res.send({ user: 'Nirzon Karmakar', role: 'Developer' })
})

// Route for product with id
app.get('/getProduct/:id', (req, res) => {
	res.send({ product: `Product ${req.params.id}` })
})

// Catch-all route for unmatched paths
app.all('*', (req, res) => {
	res.status(404).send('Page Not Found')
})

// Start the server
app.listen(5000, () => {
	log('Listening on port 5000')
})
