import express from 'express'
import morgan from 'morgan'
// import authRoutes from './routes/auth.routes.js'
// import cookieParser from 'cookie-parser'
// import taskRoutes from './routes/tasks.routes.js'
import services from './routes/services.routes.js'
import componentes from './routes/componentes.routes.js'

import cors from 'cors'
const app = express()

app.use(cors({origin:"http://localhost:8081",
credentials: true // Habilitar el envío de credenciales
}))

app.use(morgan('dev'))
app.use(express.json())


app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  

// app.use('/api',authRoutes)
// app.use('/api',taskRoutes)
app.use('/test',services)
app.use('/api',componentes)




export default app