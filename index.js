import express from 'express';

const porta = 3000;
const host = '0.0.0.0'; //todas as interfaces (placas de rede) do computador hospedeiro

var listaUsuarios = [];

const app = express();
// definir as funcionalidades do servidor acessíveis por endpoints (rotas)

//Declarar a nossa aplicação express onde está a fonte dos arquivos estáticos
app.use(express.static('./publico'));

app.use('/cadastrarUsuario', (req,resp)=>{

    //extraindo os dados do usuário da requisição enviada pelo navegador (dados do formulário html)
    const nome = req.query.nome;
    const sobrenome = req.query.sobrenome;
    const usuario = req.query.usuario;
    const cidade = req.query.cidade;
    const estado = req.query.estado;
    const cep = req.query.cep;

    //adicionando um novo usuário à lista
    //usuário == objeto javascript
    listaUsuarios.push({
        nome: nome,
        sobrenome: sobrenome,
        usuario: usuario,
        cidade: cidade,
        estado: estado,
        cep: cep
    });
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('</head>');
    resp.write('<body>');
    resp.write(`<h1>Usuário ${nome} ${sobrenome} cadastrado com sucesso!</h1>`);
    resp.write('<a href="/cadastroUsuario.html">Continuar cadastrando....</a>');
    resp.write("<br/>");
    resp.write('<a href="/listarUsuarios">Listar Usuários</a>');
    resp.write("</body>");
    resp.write('</html>')
    resp.end();
});

app.use('/listarUsuarios', (req,resp)=>{
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Usuários</h1>');
    resp.write('<table class="table table-striped">');
    resp.write('<tr>');
    resp.write('<th>Nome</th>');
    resp.write('<th>Sobrenome</th>');
    resp.write('<th>Usuario</th>');
    resp.write('<th>Cidade</th>');
    resp.write('<th>Estado</th>');
    resp.write('<th>CEP</th>');
    resp.write('</tr>');
    for (let i=0; i<listaUsuarios.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaUsuarios[i].nome}`);
        resp.write(`<td>${listaUsuarios[i].sobrenome}`);
        resp.write(`<td>${listaUsuarios[i].usuario}`);
        resp.write(`<td>${listaUsuarios[i].cidade}`);
        resp.write(`<td>${listaUsuarios[i].estado}`);
        resp.write(`<td>${listaUsuarios[i].cep}`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Voltar</a>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
    resp.write('</html>');

});

app.listen(porta, host, () => {
    console.log(`Servidor executando na porta http://${host}:${porta}`);
})


