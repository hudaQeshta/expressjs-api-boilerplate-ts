require('dotenv').config()
import errorMiddleware from './middlewares/error.middleware'

import express from 'express'
import {api} from './routes/api'

const app = express()

app.use(express.json())

api(app)

// Error Handler Middleware
app.use(errorMiddleware)

export default app