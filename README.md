<h1>Regras de negocío de requisitos, funcionais e não funcionais</h1>

<!-- ---
Rentx: Gerenciamento
Sobre: App para concessionaria de carros
--- -->


# testes jest
configurações: 

# Cadastrar carros
**RF**
Deve criar o cadastro de carros
Deve ser capaz de listar todas as categorias

**RNF**

**RN**
Não deve ser possível criar um cadastro de carro com a placa já cadastrada.
Não deve ser possível alterar uma placa de um carro já cadastrado.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsável pelo cadastro, deve ser um usuário administrador.

# Listagem de carros
**RF**
Deve ser possível listar todos os carros
Deve ser possível listar todos os carros pela placa
Deve ser possível listar todos os carros pelo nome
Deve ser possível listar todos os carros pela marca 

**RN**
Não precisa estar logado no sistema

**RNF**

# Cadastro de especificação no carro
**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não deve ser possível cadastrar uma especificação já existente para um mesmo carro
O responsavel pelo cadastro deve ser um usuário administrador

**RF**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todas as categorias

**RNF**

# Cadastro de imagem do carro
**RF**
Deve ser possível cadastrar a imagem
Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para upload de arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O responsavel pelo cadastro deve ser um usuário administrador

# Aluguel de carro
**RNF**

**RN**
O o aluguel deve ter duração mínima de 1 hora.

**RF**
Deve ser possível cadastrar um aluguel.

# Devolução de Carro
**FN**
Ao realizar a devolução, o carro deverá estar disponível para outro aluguel.

O usuário de deve estar logado.

# Detalhes do projetos

[obs:] para que fique algo de simples leitura, acrescentamos midlewares e outras configurações antes 
da rota principal, e para criarmos um padrão, fazemos essas configurações apenas no arquivo index.ts

[link para acessar aplicação](https://localhost:3333/)

parametros das rotas utilizadas:

| available     | tem acesso a todos os carros disponíveis
| createCar     | pode criar o cadastro de n carros
| specification | poderá colocar as caracteristicas de seu carro
| categories    | sel


# Revisão Sobre testes
Testes unitários; São testes onde testamos:
 * casos de uso
 * regras de negocío
 * logíca

Testes de integração: Onde testamos toda a nossa a aplicação.
vamos testar todo o nosso fluxo na aplicação.
Não podemos testar no banco real.

**TDD = test driven development é o desenvolvimento dirigido por testes.**
