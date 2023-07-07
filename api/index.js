const express    = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const port = 3500;

    app
    .get('/teste', (req, res) => res
        .status(200)
        .send({mensagem: 'Api Online'}
        )
    )

app.listen(port, () => console.log(`Servidor está online na porta ${port}`))


module.exports = app;