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

## Front-end:
 - Typescript
 - Angular
 - Angular Material

## Outras ferramentas:
 - Docker - 23.0.3
 - Docker Compose - 3.8
 - PostgreSQL - 10.17

# Relacionamento

Não foi pedido para fazer nenhum relacionamento, porém por conta da simplicidade achei coerente utilizar.

Basicamente temos uma empresa que tem vários veículos atribuidos a ela, e o veículo só pode pertencer a uma empresa.

![Relacionamento entre Empresa e Veiculos](./archives/RelacionamentoEmpresaVeiculos.png)

# Endpoints API REST:

|Método|Endpoint                              |Descrição                         |
|------|--------------------------------------|----------------------------------|
|GET   |/veiculos                             |Listagem de veículos.             |
|GET   |/veiculos:id                          |Leitura de um veículo pelo ID.    |
|GET   |/veiculos/cars                        |Listagem de carros.               |
|GET   |/veiculos/bikes                       |Listagem de motos.                |   
|POST  |/veiculos                             |Criação de um veículo.            |
|PUT   |/veiculos/:id                         |Alteração de um veículo.          |
|DELETE|/veiculos/:id                         |Deleção de um veículo.            |
|GET   |/empresa                              |Listagem de empresas.             |
|GET   |/empresa/:id                          |Leitura de um empresa pelo ID.    |
|POST  |/empresa                              |Criação de um empresa.            |
|PUT   |/empresa/:id                          |Alteração de um empresa.          |
|PUT   |/empresa/:idCompany/:idVehicle        |Adicionar um veículo na empresa.  |
|PUT   |/empresa/remove/:idCompany/:idVehicle |Remover um veículo na empresa.    |
|DELETE|/empresa/:id                          |Deleção de um empresa.            |

# Como rodar o Projeto?

Para testar o projeto e gerar o build, migration e subir o banco de dados, você precisa conferir o .env da api e database.env no root do monorepo, no projeto tem dois arquivos de exemplo.

Você precisa de docker e docker compose instalados na sua maquina, e na raiz após ter os arquivos de environment do projeto você usara o comando:

```bash
$ sudo docker compose up
```

O docker irá começar a baixar e gerar as imagens dos projetos e do banco de dados, após a geração das imagens ele irá rodar o comando das migrations para gerar as tabelas e popular elas.

Caso de algum erro na hora de rodar as migrations, caso ela não espere o banco de dados abrir conexão, rode:

```bash
$ sudo docker compose up
```
novamente.
