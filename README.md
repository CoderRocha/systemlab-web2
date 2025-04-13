# SystemLab Web v2.0

## Sistema para Laboratórios de Análises Clínicas

Esse projeto de Sistema para Laboratórios de Análises Clínicas (LIS) foi criado por mim, Guilherme Rocha, e batizei ele de "SystemLab Web 2.0". Ele é a versão mais atualizada do projeto "SystemLab Web", que também foi desenvolvido por mim.

## Tecnologias Utilizadas

- HTML5
- CSS5
- Javascript
- React.js
- Node.js
- SQLite

Foram utilizadas também algumas bibliotecas para complementar as tecnologias citadas acima, como por exemplo:

- React-Icons (Icons para a U.I)
- React-Toastify (Notificações para o Usuário)
- Axios (Conexão HTTP com o Back-End)
- XLSX (Exportar Tabelas em Excel)

## Funcionalidades

### Login e Registro de Usuário

O sistema possui um sistema de Login e Registro de Usuário, onde o usuário pode se autenticar para então, poder acessar o sistema.

Se nenhum usuário estiver registrado, não será possível acessar as funcionalidades do sistema, sendo assim, necessário cadastrar um usuário para poder acessar o sistema por completo.

Apenas as Telas de Login, Registro e Erro 404 serão disponíveis caso o usuário ainda não esteja logado.

### Listagem de Atendimentos

Os usuários podem visualizar os atendimentos que já foram cadastrados no sistema, e visualizar informações como:

- Número do Atendimento
- Nome do Paciente
- Ação (Deletar)

É possível ter vários atendimentos com o mesmo nome, porém com códigos de atendimento diferentes.

### Cadastro de Atendimento

Os usuários podem cadastrar atendimentos, e podem inserir informações como:

- Número de Atendimento (Gerado de Forma Aleatória e Único para cada Atendimento)
- Nome Completo
- Sexo
- Email
- Celular
- Lista de Exames Cadastrados no Atendimento
- Opção para Remover o Exame do Atendimento (X)

O sistema evita o cadastro de atendimentos com códigos de exames duplicados, independente se for em maiúsculo ou não.

### Listagem de Exames

Os usuários podem visualizar os exames que já foram cadastrados no sistema, e visualizar informações como:

- Código do Exame
- Descrição
- Valor (R$)
- Ação (Deletar)

Caso tenha pelo menos 1 Exame cadastrado no sistema, será disponibilizada uma opção para Exportar a Listagem de Exames em Excel, facilitando o gerenciamento dos exames cadastrados no sistema diretamente em uma planilha.

### Cadastro de Exame

É possível cadastrar diferentes tipos de exames, tendo que preencher as seguintes informações nos campos:

- Código do Exame (Sigla)
- Descrição (Nome do Exame)
- Valor (R$)

O sistema evita o cadastro de exames com códigos duplicados, independente se for em maiúsculo ou não.

### Relatório Geral de Atendimentos

É possível gerar um relatório contendo informações Gerais dos atendimentos cadastrados no sistema, como:

- Código do Paciente
- Nome Completo do Paciente
- Sexo
- Email
- Celular
- Exames Cadastrados
- Valor Total (R$)

Após gerar o Relatório, o sistema disponibiliza uma opção para Exportar o Relatório Geral em Excel, podendo facilitar o gerenciamento dessas informações diretamente em uma planilha.

### Dashboards

Após gerar o Relatório Geral, também é gerado logo abaixo dele um Dashboard semelhante ao Power B.I, onde é possível ver todos os números relacionados ao negócio do laboratório que estão disponíveis no sistema, como:

- Total de Atendimentos
- Total de Exames
- Valor Total dos Exames (R$)
- Atendimentos por Sexo
- Exames Realizados (Por Código de Exame)
- Ticket Médio (R$)

O Dashboard pode ser gerado mesmo que não tenha nenhuma informação cadastrada no sistema, porém, os dados não serão exibidos.

## Como Executar o Projeto?

Como o Projeto está divido em duas pastas (Front-End e Back-End), acesse cada uma das 2 pastas para poder verificar o README.md que irá lhe auxiliar a como instalar todas as dependências e pacotes necessários para poder rodar o projeto localmente.