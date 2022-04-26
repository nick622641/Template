const express         = require('express')
const cookieParser    = require('cookie-parser')
const fileUpload      = require('express-fileupload')
const cors            = require('cors')
const errorMiddleware = require('./middlewares/errors')
const path            = require('path')
const app             = express()

app.use( express.json( { limit: '50mb' } ) )
app.use( express.urlencoded( { limit: '50mb', extended: true } ) )
app.use( cookieParser())
app.use( fileUpload())
app.use(cors())

// Import all routes
const product  = require( './routes/product'  )
const category = require( './routes/category' )
const auth     = require( './routes/auth'     )
const payment  = require( './routes/payment'  )
const order    = require( './routes/order'    )
const image    = require( './routes/image'    )
const contact  = require( './routes/contact'  )

app.use( '/api/v1', auth     )
app.use( '/api/v1', product  )
app.use( '/api/v1', category )
app.use( '/api/v1', payment  )
app.use( '/api/v1', order    )
app.use( '/api/v1', image    )
app.use( '/api/v1', contact  )

if ( process.env.NODE_ENV === 'PRODUCTION' ) {
    app.use( express.static( path.join( __dirname, '../frontend/build' ) ) )
    app.get( '*', ( req, res ) => {
        res.sendFile( path.resolve( __dirname, '../frontend/build/index.html' ) )
    })
}

// Middleware to handle errors
app.use( errorMiddleware )

module.exports = app