# <p align="center"> Projeto final Gama </p></br>

## <p align="center"> E-commerce (Livraria) </p></br>
  
  <p align="center">Projeto de MVP (Produto Mínimo Viável) de um ecommerce com o propósito de aplicar conhecimentos adquiridos durante XP48 da Gama Academy. Prezando pela      utilização de boas práticas e escalabilidade de sotfware.</p></br>

### <p align="center"> Documentação da API: https://tcx42.github.io/API-ecommerce-livraria/ </p>
### <p align="center"> Webservice/API: https://api-ecommerce-livraria.onrender.com/ </p>
### <p align="center"> Repositório Front End: https://github.com/BrunaRZP/Bookstore </p>
### <p align="center"> Site/E-commerce:  </p></br>

### <p align="center"> Status - Completo </p></br><hr></br>

## <p align="center">Stacks</p></br>

### Front End
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://www.w3schools.com/css/default.asp)
- [BOOTSTRAP](https://getbootstrap.com/docs/3.4/css/)
- [REACT](https://legacy.reactjs.org/docs/getting-started.html)
- [TypeScript](https://www.typescriptlang.org/)</br>

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" width="52" alt="html5 logo"  /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" width="52" alt="css logo"  /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" height="40" width="52" alt="bootstrap logo"  /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" width="52" alt="react logo"  /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" width="52" alt="bootstrap logo"  />
</br></br><hr>

### Back End
- [NodeJs](https://nodejs.org/en)
- [Express](https://www.npmjs.com/package/express)
- [JEST](https://jestjs.io/pt-BR/docs/getting-started)
- [Babel](https://babeljs.io/docs)
- [MySql](https://dev.mysql.com/doc/)
- [TypeScript](https://www.typescriptlang.org/)</br>

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons//nodejs/nodejs-original.svg" height="40" width="52" alt="node logo"  /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" width="52" alt="express logo"  /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" height="40" width="52" alt="jest logo"  /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg" height="40" width="52" alt="babel logo"  /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" height="40" width="52" alt="mysql logo"  />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" width="52" alt="typescript logo"  />
</br></br><hr>

### Dependências</br>

- [Prisma](https://www.prisma.io/)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/@types/cors)
- [node:crypto](https://nodejs.org/api/crypto.html)
- [cookie-parser](https://www.npmjs.com/package/@types/body-parser)
- [multer](https://www.npmjs.com/package/multer)
</br></br>
<hr></br>

## <p align="center">Funcionalidades (Front End)</p></br>

### Autenticação</br>

Teremos uma página de login, que irá solicitar as informações
para autenticar o usuário, independente do seu tipo
(Administrador ou Cliente). Ao ter sucesso na autenticação, deve
redirecionar o usuário para home.
Regra: Caso seja um usuário administrador deverá ser
habilitado um link no menu da página home para acesso ao
painel admin.
Além disso, o usuário deve permanecer autenticado, durante o
tempo de validade do token.
</br></br>
<hr>

### Painel Administrativo</br>

Dentro do painel administrativo teremos páginas com
formulários e lista de informações para cada entidade do nosso
sistema: Produtos, Categorias, Clientes e Pedidos. A ideia é que
possamos gerenciar cada operação do CRUD por meio de
interfaces.
Regra: Somente usuários administradores podem acessar o
painel, caso um usuário cliente acesse essa página ele deve ser
direcionado para a home.
</br></br>
<hr>

### Home Page</br>

Deve ser a primeira página ao acessar a aplicação, ela deverá ter a
listagem de alguns produtos de forma dinâmica (Com
informações do banco). Contará com um menu de navegação
para guiar o usuário para outras rotas.
E com um rodapé para informações da loja.
</br></br>
<hr>

### Página de Listagem de Produtos</br>

Deve ser uma página que irá listar os produtos cadastrados no
sistema, exibindo informações mínimas como foto, preço, nome
do produto e etc.
Essa página deve ter uma paginação, para não exibir todos os
produtos de uma vez. Como por exemplo, exibir de 10 em 10
produtos por página.
</br></br>
<hr>

### Página Interna de Produtos</br>

Deve ser uma página que irá exibir as informações completas de
um produto específico, além disso, deve haver um botão de
comprar que adicione esse item ao carrinho.
</br></br>
<hr>

### Carrinho de Compras</br>

Essa é uma página que terá a lista de produtos escolhida pelo
cliente para finalizar a compra. Deve ser possível excluir produtos
e voltar para adicionar mais produtos ao carrinho.
Além disso, acompanhado do botão para finalizar o pedido, deve
haver o total do pedido somando todos os itens do carrinho.
Regra: Clientes só podem finalizar um pedido se estiverem
autenticados.
</br></br>
<hr>

### Página de Pedido feito com Sucesso</br>

Deve exibir uma página informando que o pedido foi criado com
sucesso, exibindo os itens comprados
</br></br>
<hr>

### Página de Pedidos</br>

Deve existir uma página para que o cliente possa ver os pedidos
realizados por ele.
Regra: Somente os pedidos feitos pelo cliente devem aparecer,
além disso só usuários autenticados podem acessar essa rota.
</br></br>
<hr>

### Página de Dados Pessoais</br>

Deve existir uma página para que o cliente possa ver e alterar
seus dados pessoais.
Regra: Só usuários autenticados podem acessar essa rota.
</br></br>
<hr></br>

## <p align="center">Funcionalidades (Back End)</p></br>

- Cadastrar usuários | categorias | produtos
- Consultar/Listar usuários | categorias | produtos
- Atualizar usuários | categorias | produtos
- Deletar usuários | categorias | produtos
- Fazer Pedidos
- Consultar/Listar Pedido
- Atualizar Pedido
- Cancelar Pedido
</br></br>
<hr>

### Usuários</br>

Nesse projeto temos dois tipos de usuários: administradores e clientes. Por meio desses tipos serão liberadas algumas funcionalidades. Deve ter no mínimo os seguintes campos: nome, email, senha e tipo de usuário.</br></br>
Além disso, deve existir uma rota exclusiva para cadastrar usuários administradores com a seguinte regra: Um novo administrador só pode ser criado por um administrador
existente. Para isso iremos usar o recurso de autenticação JWT que será desenvolvido nas próximas features.</br></br>
Deve ser criado uma rota para cada operação do CRUD, e com exceção da rota de cadastro todas as demais rotas só devem ser acessadas por usuários autenticados (JWT).
</br></br><hr>

### Autenticação</br>

O processo de autenticação deve contar com uma rota para o login que deverá ter no mínimo a opção de login com email e senha.</br>
Caso as informações estejam corretas devem retornar um tokenjwt contendo no mínimo as seguintes informações do usuário: identificador, nome, email e tipo de usuário. 
</br></br>
Deve-se criar uma validação com base nesse token para acesso das rotas, sendo dessa forma que iremos identificar o usuário que está realizando a chamada.
</br></br><hr>

### Categorias</br>

Deve ser criado um recurso de categorias que irão nos permitir classificar os produtos que serão cadastrados no sistema.
Deve ser criada uma rota para cada operação do CRUD. Além disso todas as rotas, com exceção da rota de listagem das
categorias, só devem ser acessadas por um usuárioadministrador
Na criação da categoria deve existir a seguinte regra: Não deve ser possível cadastrar duas categorias com o mesmo nome.
</br></br><hr>

### Produtos</br>

Deve ser criada uma rota para cada operação do CRUD. Alémdisso, todas as rotas, com exceção da rota de listagem dos
produtos, só devem ser acessadas por um usuário administrador.
Vale dizer que as informações mínimas de um produto devemser: nome, foto, preço, descrição e categoria.
Além disso, a rota de listagem do produto deve trazer populadaas informações da categoria e não apenas seu identificador
</br></br><hr>

### Pedidos/Vendas</br>

Deve ser criada uma rota para cada operação do CRUD. Além disso, todas as rotas, com exceção da rota de listagem dos produtos, só devem ser acessadas por um usuário logado
(Independente do tipo de usuário).
As informações mínimas de um pedido/venda deve ser:identificador da venda, usuário que está comprando, lista de produtos que foi escolhida pelo usuário, valor total da venda.
</br></br><hr></br>

## <p align="center">Autores</p><br>

### Front End</br>

| [<img src="https://avatars.githubusercontent.com/BrunaRZP" width=115><br><sub>Bruna Zanotti</sub><br><sub>5135XP48</sub>](https://github.com/BrunaRZP) |  [<img src="https://avatars.githubusercontent.com/Leonardo-tech-stack" width=115><br><sub>Leonardo Carvalho</sub><br><sub>5085XP48</sub>](https://github.com/Leonardo-tech-stack) |  [<img src="https://avatars.githubusercontent.com/joycesnellings" width=115><br><sub>Joyce Souza</sub></br><sub>5113XP48</sub>](https://github.com/joycesnellings) | [<img src="https://avatars.githubusercontent.com/Felipe-Full" width=115><br><sub>Felipe Barbosa</sub></br><sub>5126XP48</sub>](https://github.com/Felipe-Full) |
| :---: | :---: | :---: | :---:| 

</br></br><hr></br>

### Back End</br>


| [<img src="https://avatars.githubusercontent.com/tcx42" width=115><br><sub>Tiago Xavier</sub><br><sub>5134XP48</sub>](https://github.com/tcx42) |  [<img src="https://avatars.githubusercontent.com/fesantananeto" width=115><br><sub>Fernando de Santana Neto</sub><br><sub>5111XP48</sub>](https://github.com/fesantananeto) |  [<img src="https://avatars.githubusercontent.com/jonny2024" width=115><br><sub>Jonatas</sub></br><sub>5122XP48</sub>](https://github.com/jonny2024) | [<img src="https://avatars.githubusercontent.com/cassianobaptista" width=115><br><sub>Cassiano Baptista</sub></br><sub>5093XP48</sub>](https://github.com/cassianobaptista) | [<img src="https://avatars.githubusercontent.com/R7chardHS" width=115><br><sub>Richard Vasques</sub></br><sub>5168XP48</sub>](https://github.com/R7chardHS) | [<img src="https://avatars.githubusercontent.com/R" width=115><br><sub>Gustavo Gandara</sub></br><sub>5099XP48</sub>](https://github.com/) |
| :---: | :---: | :---: | :---:| :---: | :---: |

</br></br><hr></br></br>

<p align="center">Hospedagem do Front End em: https://www.vercel.com </p>
<p align="center">Hospedagem do Back End em: https://www.render.com</p>
<p align="center">Hospedagem do Banco de Dados em: https://www.heroku.com</p></br></br>
<p align="center">XP48 - Gama Academy</br> 2023 </p>









