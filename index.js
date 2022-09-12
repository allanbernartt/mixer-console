const path = require('path')
const express = require('express')
const rootDir = require('./utils/rootdir')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(rootDir, 'public')))
app.set('view engine', 'ejs')

app.get('/',( req, res) => {   
    res.render('index', {       
    })
})

app.listen(PORT)
