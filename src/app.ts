import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
var bodyParser = require('body-parser')

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

const router = require('./routers/index');
app.use(router);

const swaggerDocument = require('../swagger.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`server is listening on ${port} !!!`);
});
