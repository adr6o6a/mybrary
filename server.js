if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Database connected'))

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)

app.use('/', indexRouter)

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`))