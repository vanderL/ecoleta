const express = require('express')
const server =  express()

//configurar a pasta publica
server.use(express.static('public'))


//enginer template
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})


// rotas
// configurar caminhos da minha aplicação
// página inicial
// req: requisição
// res: Resposta
server.get('/', (req, res) => {
    return res.render('index.html'/*, { title: "Um titulo bem aqui novinho"}*/)
})

server.get('/create-point', (req, res) => {
    return res.render('create-point.html'   )
})

server.get('/search-results', (req, res) => {
    return res.render('search-results.html')
})

//ligar o servidor
server.listen(3000)
