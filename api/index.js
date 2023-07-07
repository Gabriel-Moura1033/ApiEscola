const express    = require('express')
const routes = require('./routes')

const app = express()
const port = 3500;

routes(app)

app.listen(port, () => console.log(`Servidor está online na porta ${port}`))


module.exports = app;