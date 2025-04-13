## Como Executar o Projeto? (Back-End)

Para executar corretamente o lado Back-End do Projeto, primeiro abra um outro Terminal (além daquele que está executando o Front-End) dentro de um Editor de Códigos (VS Code) e digite o seguinte comando para acessar a pasta Back-End:

### `cd back-end`

Agora que está dentro da pasta correta, você pode instalar as dependências e pacotes essenciais com o seguinte comando:

### `npm install`

Após isso, todas as dependências e pacotes essenciais terão sido instalados com sucesso em seu computador.

Agora, para executar o servidor do projeto localmente, digite o seguinte comando no Terminal:

### `node server.js`

Logo após o comando ter sido executado com sucesso, irá aparecer a informação no console do terminal sobre uma URL Local para poder acessar o Servidor do Projeto.

Você pode acessar diretamente por esse Link: [http://localhost:5000](http://localhost:5000)

## Próximo Passo

Agora que tanto o Front-End quanto o Back-End estão sendo executados corretamente, você pode utilizar o Sistema sem problemas.

Para acessar os dados do Back-End, você pode acessar as seguintes URLs:

# Atendimentos

[http://localhost:5000/atendimentos](http://localhost:5000/atendimentos)

# Exames

[http://localhost:5000/exames](http://localhost:5000/exames)

# Relatórios

[http://localhost:5000/relatorios](http://localhost:5000/relatorios)

Todas as informações do Banco de Dados serão armazenadas dentro da pasta "db", no arquivo 'database.sqlite'.

O arquivo 'database.sqlite' é criado automaticamente após iniciar o Servidor no comando que vimos acima.

Caso já tenha inserido alguma informação e queira resetar o banco, teria apenas que encerrar a execução do Back-End, indo no Terminal que está sendo executado o servidor e apertando as seguintes teclas ao mesmo tempo:

### "CTRL" + "C"

Com isso, vai encerrar a execução do servidor. Agora você pode deletar o arquivo 'database.sqlite' para resetar o banco de dados e ficar com o sistema "limpo", podendo executar o Servidor novamente pelo Terminal para gerar um novo arquivo de banco de dados logo após ter realizado esse processo.
