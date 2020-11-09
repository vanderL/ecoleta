const express = require('express')
const server =  express()


const db = require("./database/db")
//configurar a pasta publica
server.use(express.static('public'))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))


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

    //req.query: Query String  da URL
    console.log(req.query)

    return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {


    //req.body: O corpo do formulário
    console.log(req.body)

    const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `
    const values = [
       req.body.name,
       req.body.image,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render('create-point.html', {saved: true})

    }

    db.run(query, values, afterInsertData) 

})


server.get('/search-results', (req, res) => {
    
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        
        const total = rows.length

        return res.render('search-results.html', { places: rows, total})
    })
    
})

//ligar o servidor
server.listen(3000)
