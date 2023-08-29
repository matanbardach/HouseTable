const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('./services/logger');
const sequelize = require('./db/database')
const housesRoute = require('./api/houses');
const app = express();
const port = 3001;

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/api/houses', housesRoute);

app.listen(port, async () => {
    try {
        await sequelize.sync()
        logger.info('DB init Successfully');
        // init teh database
    } catch(err) {
        logger.error('Failed to inti DB', { err });
    }
    console.log(`listening on port ${port}`)
})