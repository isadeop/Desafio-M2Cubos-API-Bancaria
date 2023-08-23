![](https://i.imgur.com/xG74tOh.png)

# Desafio Módulo 2 - Back-end - API Bancária

## Objetivo do projeto:
 Esse projeto foi construído enquanto tarefa avaliativa, e tem como objetivo a criação de uma API Rest para um Banco Digital.
 A ideia é que seja um projeto projeto piloto no qual outras funcionalidades serão implementadas no futuro.
 Cabe salientar que é um projeto que não utiliza banco de dados, e portanto os dados são salvos em memória.

## Funcionalidades da API:

-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depósitar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário

## Status Code Utilizados

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
```

## Validações:
Cada endpoint do projeto requer algum tipo de validação para acesso aos dados ou alteração dos dados.
Algumas das validações implementadas foram: conferência de senha, conferência de que todas as informações necessárias foram fornecidas por paramêtros no query ou no body, conferência de existência de consta, dentre outros.

## Melhorias Mapeadas:
Atualmente existem melhorias mapeadas no projeto, como a criação de funções para alguns métodos que foram repetidos dentro de controladores e a readequação de alguns middleware, porém, devido ao prazo avaliativo serão realizadas a posteriori.
As melhorias mapeadas **NÃO** influenciam na utilização da API, e são apenas referentes à um código mais limpo.
Todas as funcionalidades conforme exibidas abaixo estão funcionando.

## Rotas

#### Rota de criação de contas.
Devem ser enviadas todas as informações necessárias para criação da conta, conforme imagem abaixo.


![image](https://github.com/isadeop/Desafio-M2Cubos-API-Bancaria/assets/138228355/a50b4595-c211-411d-9b6b-d4002426045b)




#### Rota de listagem de contas (acesso do gerente).
Permite a visualização de todas as contas cadastradas no banco, sendo necessário fornecer senha, conforme imagem abaixo.
Caso não exista conta registrada, retorna mensagem de acordo.


![image](https://github.com/isadeop/Desafio-M2Cubos-API-Bancaria/assets/138228355/c0f8536a-1306-4eaa-8473-398d0658649d)




#### Rota de depósito em conta.
Devem ser fornecidos número de conta válido e valor em centavos a ser enviado.


![image](https://github.com/isadeop/Desafio-M2Cubos-API-Bancaria/assets/138228355/2dc1a7ba-03df-4bdf-bf90-31d37a80b8d7)



#### Rota de Saque.
É necessário informar número de conta, valor a sacar e senha pessoal do banco.


![image](https://github.com/isadeop/Desafio-M2Cubos-API-Bancaria/assets/138228355/69db12e7-c79b-4ef3-a367-2c468f8f9841)



#### Rota de Tranferência.
É necessário informar o número da conta origem, conta de destino, valor da transferência e senha pessoal do banco.


![image](https://github.com/isadeop/Desafio-M2Cubos-API-Bancaria/assets/138228355/47a8c935-9eac-4dd7-9e26-41065809e62b)




#### Rota de Acompanhamento de Saldo
É necessário informar número de conta e senha pessoal do banco como parâmetro query, conforme abaixo.


![image](https://github.com/isadeop/Desafio-M2Cubos-API-Bancaria/assets/138228355/fd6bab6f-8f04-4be0-afc1-00ccc2260b64)


#### Rota de Exibição de Extrato
É necessário informar o número e senha pessoal da conta como parâmetro query, conforme abaixo.


![image](https://github.com/isadeop/Desafio-M2Cubos-API-Bancaria/assets/138228355/4f1f9d44-dfa1-4caa-8bf5-1e976de9e7f7)



#### Rota de Exclusão de Conta
Só é possível excluir uma conta caso o saldo dela seja zero. É necessário informar o número da conta como parâmetro de rota.


![image](https://github.com/isadeop/Desafio-M2Cubos-API-Bancaria/assets/138228355/bfc38ef4-38fd-436f-873c-3d50d450e4b1)



#### Rota de Alteração de Conta.
É necessário informar o número da conta na rota, e enviar as informações a serem alteradas no body. A senha pessoal da conta é obrigatória para realizar a operação.


![image](https://github.com/isadeop/Desafio-M2Cubos-API-Bancaria/assets/138228355/0c5b4435-c0c9-4970-b2ad-df28f361aa6f)



###### tags: `back-end` `JavaScript` `nodeJS` `API REST` 
