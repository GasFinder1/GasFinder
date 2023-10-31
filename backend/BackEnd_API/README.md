# como usar essa API

link do projeto no [Github](https://github.com/GasFinder1/GasFinder).

## como iniciar o projeto?

### Com Node:
`node ./backend/BackEnd_API/src/index.js`

### Com Nodemon (+ caso esteja na pasta BackEnd_API pode usar o npm ou yarn):
`nodemon ./backend/BackEnd_API/src/index.js`
`yarn start`
`npm start`

## Como fazer as requisições?

### /login
`post`.`JSON` 
envio {email, password}
resposta {message, token} em caso de erro {error}


### /user
`post`.`JSON`  cadastro do usuário
envio {name_user, email, password}
resposta {message} em caso de erro {error}

`put`.`JSON` atualizar informações do usuário
envio {idUser, name_user, email, password}
resposta {message} em caso de erro {error}

`delete`.`Body` deletar usuario
envio /idUser
resposta {message} em caso de erro {error}


### /password
`post`.`JSON` recuperar senha
envio {userEmail}
resposta {message} em caso de erro {error}


### /station
`get`.`JSON`<>`body` pegar o posto que corresponde a localização ou os postos que corresponderem a pesquisa por similaridade
envio {lat, lon, cep, endereco, posto} ou ?lat=&lon=&cep=&endereco=&posto=
resposta {posto(sem lat e lon)} <> {posto(com lat e lon)} em caso de erro {error}


### /confirmGasStation
`post`.`JSON` envia o relacionamento de um posto com o dado no banco de dados
envio {lat, lon, id_posto}
resposta {message} em caso de erro {error}