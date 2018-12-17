# lambda-create-cli

Projeto desenvolvido para auxiliar no desenvolvimento de funções lambda com nodeJs atráves de linha de comando(CLI). Padronizando o desenvolvimento.
 
### Installation

lambda-create-cli requer [Node.js](https://nodejs.org/) v4+ para rodar.
Instalar como dependência global.

```sh
$ npm i lambda-create-cli -g
$ cd seu-projeto
```

Para rodar os comandos...

```sh
$ lambda-create-cli --name FunctionName
$ lambda-create-cli --name FunctionName --noModel
$ lambda-create-cli --name FunctionName --noService 
$ lambda-create-cli --name FunctionName --noRequest 
$ lambda-create-cli --name FunctionName --action create,update,get,getall,delete 
$ lambda-create-cli --update FunctionName --actionType create --add newFunction
```

### Documentação
#### Create new function with (Model,Service,Request)

```sh 
$ lambda-create-cli --name FunctionName
```

#### Create new function without Model
```sh 
$ lambda-create-cli --name FunctionName --noModel
```
#### Create new function without Service
```sh
$ lambda-create-cli --name FunctionName --noService
```
#### Create new function without Request
```sh
$ lambda-create-cli --name FunctionName --noRequest
```
#### Create new function with specific actions
```sh
$ lambda-create-cli --name FunctionName --action create,update,get,getall,delete
```
#### Local for save your new folders
```sh
$ lambda-create-cli --name FunctionName --path src/app
```

### updated file with new function
```sh
$ lambda-create-cli --update FunctionName --actionType create --add newFunction
```
 - (update) flag para identificar o tipo de ação.
 - (FunctionName) nome da função que será atualizada ex: ClientService (Client).
 - (--actionType) a função será criado com base em um tipo ex: (create,update,get,getall,delete).
 - (--add) o nome da nova função que será criada.

License
----
MIT