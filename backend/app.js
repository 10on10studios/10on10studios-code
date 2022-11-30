const { sequelize } = require('./models')
const express = require('express');
const loginRoute = require('./routings/user.signup.loginroutes')
const videoRoute = require('./routings/video.routing')
const cors = require('cors')

const app = express()
app.use(cors())
const bodyparser = require('body-parser');

app.use(express.json())
app.use(bodyparser.json());

// app.get('/', (req, res)=>{
//     res.render('contact')
// })


app.use('/api/v1',loginRoute)
app.use('/api/v1',videoRoute)




app.listen({ port: 3000 }, async () => {
    console.log(`Server up on http://localhost:3000`)
    await sequelize.authenticate()
    console.log('Database Connected!')
})