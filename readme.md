### Cervejarias Api

Aplicação backend que faz uma busca nas cervejarias disponíveis de acordo com o termo pesquisado. os dados retornados na pesquisa tem origem na api pública <a href="https://www.openbrewerydb.org/">Open Breweries</a>. Para consultar dos dados é necessário criar um novo usuário e estar devidamente autenticado.

### Endpoints de requisição

| endpoint              | verbo HTTP | Descrição                                                      |
| --------------------- | ---------- | -------------------------------------------------------------- |
| /login                | POST       | Login para usuário cadastrado                                  |
| /user                 | POST       | Cadastro de usuáiro                                            |
| /breweries            | GET        | Exibe listagem inicial de cervejarias                          |
| /breweries?query=term | GET        | Exibe listagem de cervejarias de acordo com o termo pesquisado |

### Requisitos

Para rodar esta aplicação localmente tenha instalado em sua máquina

- typescript
- nodejs
- docker
- postgres sql
- yarn
- rest client

## Iniciando aplicação

- Para iniciar esta aplicação, clone este repositório e instale as dependências rodando o comando `yarn install`.
- Modifique o arquivo **.env.example** para **.env** e configure as credenciais da url de conexão com o banco de dados de acordo com as variáveis do arquivo **docker-compose.yml**, e insira uma chave secreta na variável **JWT_SECRET** para utilização da autenticação jwt.
- instale as migrations rodando o comando `yarn prisma migrate dev`
- inicialize o servidor em modo de desenvolvimento com o comando `yarn start:dev`, ou em modo de produção com o comando `yarn start:prod`, neste ultimo caso uma pasta **dist** será criada na raiz do repositório, em ambos os casos, o servidor será inicializado na porta **3333**

### criando um novo usuário

Faça o envio dos dados em formato **json** para o endpoint adequado, em caso de sucesso, uma resposta com status 201 será retornada, exemplo:

```
{
	"username":"@defaultUser",
	"password":"DefaultPass"
}
```

os dados enviados devem atender ao seguinte tipo:
| campo | tipo
| ----- | ----------
| username | string  
| password | string

### Login para usuário existente

Para fazer login é necessário enviar um usuário e senhas válidas para o endpoint correspondente. Em caso de sucesso, um **token jwt** será enviado no header da resposta com a chave **authorization-token : token**

### Listando cervejarias

Para listar as cervejarias é necessário enviar junto da requisição um token jwt válido no formato bearer-token. Caso um token não seja enviado uma resposta com status 401 será retornada, caso um token inválido seja enviado uma resposta 403 será retornada.
Quando um token válido é enviado, um conjunto de dados de cervejaria em formato json será retornado, por exemplo:

```
[
	{
		"id": "10-56-brewing-company-knox",
		"name": "10-56 Brewing Company",
		"brewery_type": "micro",
		"street": "400 Brown Cir",
		"address_2": null,
		"address_3": null,
		"city": "Knox",
		"state": "Indiana",
		"county_province": null,
		"postal_code": "46534",
		"country": "United States",
		"longitude": "-86.627954",
		"latitude": "41.289715",
		"phone": "6308165790",
		"website_url": null,
		"updated_at": "2022-10-30T06:11:39.514Z",
		"created_at": "2022-10-30T06:11:39.514Z"
	},
	{
		"id": "10-barrel-brewing-co-bend-1",
		"name": "10 Barrel Brewing Co",
		"brewery_type": "large",
		"street": "62970 18th St",
		"address_2": null,
		"address_3": null,
		"city": "Bend",
		"state": "Oregon",
		"county_province": null,
		"postal_code": "97701-9847",
		"country": "United States",
		"longitude": "-121.28170597038259",
		"latitude": "44.08683530625218",
		"phone": "5415851007",
		"website_url": "http://www.10barrel.com",
		"updated_at": "2022-10-30T06:11:39.514Z",
		"created_at": "2022-10-30T06:11:39.514Z"
	}
],
```
