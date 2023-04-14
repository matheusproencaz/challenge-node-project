# O Desafio

O desafio consiste em criar uma API REST NODE.JS para gerenciar um estacionamento de carros e motos.

## Cadastro de estabelecimento
### Funcionalidades:
- Estabelecimento: CRUD;
- Veículos: CRUD;

### O cadastro da empresa deve conter os seguintes campos:
- Empresa: 
 - Nome;
 - CNPJ;
 - Endereço;
 - Telefone;
 - Quantidade de vagas para motos;
 - Quantidade de vagas para carros.
* Todos os campos são de preenchimento obrigatório.

### O cadastro de veículos deve conter os seguintes campos:

- Veículos:
 - Marca;
 - Modelo;
 - Cor;
 - Placa;
 - Tipo.

* Todos os campos são de preenchimento obrigatório.

## Requisitos

 - Modelagem de dados;
 - Requisições GET, POST, PUT ou DELETE, conforme a melhor prática;
 - Utilizar Postgree para armazenamento de dados
 - Criar README do projeto descrevendo as tecnologias utilizadas, chamadas dos serviços e configurações necessário para executar a aplicação.

## Desejável

Criar um projeto em Angular com Theme Angular Material com as Telas de CRUD do exercício em questão.
Criar arquivo docker-compose.yaml para subir postegree + aplicação via docker

# Linguagens e Técnologias
## Back-end:
 - Typescript
 - NodeJS - V18.10.0
 - Jest

## Front-end:
 - Typescript
 - Angular
 - Angular Material
 - Jest / Jasmine

## Outras ferramentas:
 - Docker - 23.0.3
 - Docker Compose - 3.8
 - PostgreSQL - 10.17

# Endpoints API REST:
  
- GET /veiculos             Listagem de veículos.
- GET /veiculos:id          Leitura de um veículo pelo ID.
- POST /veiculos            Criação de um veículo.
- PUT /veiculos/:id         Alteração de um veículo.
- DELETE /veiculos/:id      Deleção de um veículo.

- GET /empresa             Listagem de empresas.
- GET /empresa/:id         Leitura de um empresa pelo ID.
- POST /empresa            Criação de um empresa.
- PUT /empresa/:id         Alteração de um empresa.
- DELETE /empresa/:id      Deleção de um empresa.
