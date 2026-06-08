# Pokédex TypeScript Lite

## Sobre o projeto

O Pokédex TypeScript Lite é uma aplicação back-end simples desenvolvida em Node.js com TypeScript que consulta dados de Pokémon na PokeAPI, exibe as informações no terminal e permite ao usuário capturar e organizar Pokémon em uma Pokédex local salva em arquivo JSON.

## Objetivo

Praticar os principais conceitos do Módulo 01: Node.js e JavaScript no back-end, TypeScript com tipagem forte, interfaces e types, funções tipadas com parâmetros e retornos, arrays e objetos, métodos de array, classes com atributos e modificadores de acesso, async/await com Promises e fetch, tratamento de erros com try/catch, persistência em arquivo JSON com fs/promises, GitHub, GitFlow e Kanban.

## Tecnologias utilizadas

- Node.js
- TypeScript
- TSX
- PokeAPI
- Git + GitHub

## Pré-requisitos

- Node.js (v18 ou superior)
- npm
- Git
- tsx@4.22.4
## Como instalar

Clone o repositório:

git clone https://github.com/fe-l-i-p-e/projeto-m1.git

Acesse a pasta do projeto:

cd projeto-m1

Instale as dependências:

npm install

## Como executar

Ambiente de desenvolvimento:

npm run dev

Compilar o projeto:

npm run build

Executar a versão compilada:

npm run start

## Estrutura do projeto

projeto-m1/
│
├── src/
│   ├── main.ts                      # Ponto de entrada da aplicação
│   ├── controllers/
│   │   └── TerminalController.ts    # Gerencia a interface com o usuário via terminal
│   ├── services/
│   │   ├── PokeApiService.ts        # Busca dados na PokeAPI via fetch
│   │   ├── SalvarPokemon.ts         # Salva e verifica duplicidade no arquivo JSON
│   │   └── searchPokedex.ts         # Lê, lista e busca Pokémon na Pokédex local
│   └── models/
│       ├── Pokemon.ts               # Interface PokemonApiResponse
│       └── CatalogoPokemon.ts       # Interface Pokeresumo
│
├── pokedex.JSON                     # Banco de dados local em JSON
├── tsconfig.json
├── package.json
└── README.md

## Funcionalidades

- Buscar Pokémon por nome ou ID via PokeAPI
- Tratar erro de Pokémon inexistente sem quebrar a aplicação
- Transformar a resposta da API em objeto simplificado (Pokeresumo)
- Capturar Pokémon e salvar na Pokédex local (pokedex.JSON)
- Impedir registro duplicado pelo id
- Buscar um Pokémon específico na Pokédex por nome ou ID
- Listar todos os Pokémon registrados na Pokédex
- Exibir mensagens claras no terminal em todas as etapas
- Remover um Pokémon específico da Pokédex por nome ou ID
- Remover todos os Pokémon da Pokédex com confirmação
## Exemplos de execução

### Busca válida

Entrada: pikachu

Saída:
________________________

   BUSCA DE POKÉMONS
________________________

Digite o nome ou ID do Pokémon que deseja buscar:
pikachu
Você encontrou um "pikachu" selvagem! Deseja capturá-lo? (S/N):

### Captura e salvamento

Entrada: S

Saída:
Pokemon "pikachu" registrado com sucesso em sua Pokédex!

### Duplicidade

Entrada: pikachu // segunda vez

Saída:
O Pokemon "pikachu" já está registrado em sua Pokédex

### Busca inválida

Entrada: JoJo

Saída:
Pokémon não encontrado.

### Listar todos os Pokémon

Entrada:
Deseja consultar sua Pokédex? S
Deseja buscar um Pokémon específico? N

Saída:
══ SUA POKÉDEX (2 capturado(s)) ══

┌─────────────────────────────┐
  #25 — PIKACHU
  Tipos : electric
  Altura: 0.4 m
  Peso  : 6 kg
└─────────────────────────────┘

┌─────────────────────────────┐
  #658 — GRENINJA
  Tipos : water, dark
  Altura: 1.5 m
  Peso  : 40 kg
└─────────────────────────────┘

### Busca específica na Pokédex

Entrada:
Deseja consultar sua Pokédex? S
Deseja buscar um Pokémon específico? S
Digite o nome ou ID: greninja

Saída:
┌─────────────────────────────┐
  #658 — GRENINJA
  Tipos : water, dark
  Altura: 1.5 m
  Peso  : 40 kg
└─────────────────────────────┘
### Remover um Pokémon específico

Entrada:
Deseja remover algum Pokémon da Pokédex? S
Remover um Pokémon específico ou todos? E
Digite o nome ou ID do Pokémon que deseja remover: pikachu

Saída:
[OK] "pikachu" foi removido da sua Pokédex.

### Pokémon não encontrado para remoção

Entrada:
Deseja remover algum Pokémon da Pokédex? S
Remover um Pokémon específico ou todos? E
Digite o nome ou ID do Pokémon que deseja remover: mewtwo

Saída:
[AVISO] Nenhum Pokémon encontrado com "mewtwo" na Pokédex.

### Remover todos os Pokémon

Entrada:
Deseja remover algum Pokémon da Pokédex? S
Remover um Pokémon específico ou todos? T
Tem certeza que deseja esvaziar toda a Pokédex? S

Saída:
[OK] Sua Pokédex foi esvaziada.

### Remoção cancelada

Entrada:
Deseja remover algum Pokémon da Pokédex? S
Remover um Pokémon específico ou todos? T
Tem certeza que deseja esvaziar toda a Pokédex? N

Saída:
Operação cancelada.

### Pokémon não encontrado na Pokédex

Entrada: mewtwo

Saída:
Pokémon não encontrado na sua Pokédex.

## Conceitos aplicados

**TypeScript:** todos os arquivos são .ts com tipagem explícita em parâmetros, retornos de funções e objetos. O tsconfig.json está configurado com strict: true.

**Interfaces:** PokemonApiResponse tipagem do objeto retornado pela PokeAPI, mapeando apenas os campos utilizados (id, name, height, weight, types). Pokeresumo é a tipagem interna do objeto simplificado salvo na Pokédex (id, nome, tipos, altura, peso).

**Fetch e async/await:** a função PokeBusca em PokeApiService.ts utiliza fetch nativo do Node.js com async/await para consultar o endpoint https://pokeapi.co/api/v2/pokemon/{nome-ou-id}.

**Tratamento de erros:** toda a busca na API está envolta em try/catch. Quando o Pokémon não existe, a API retorna status 404 e a função retorna null sem quebrar a aplicação.

**Métodos de array utilizados:**
- .map() — extrair nomes dos tipos da resposta da API
- .find() — verificar se Pokémon existe na Pokédex por nome ou ID
- .some() — checar duplicidade antes de salvar
- .forEach() — exibir todos os Pokémon da Pokédex no terminal

**Classe TerminalController:** possui atributo privado interfaceConsole, construtor que inicializa o readline e método iniciar que orquestra todo o fluxo de perguntas e respostas com o usuário.

**Persistência com fs/promises:** o arquivo pokedex.JSON é lido e escrito com readFile e writeFile do módulo node:fs/promises, mantendo os dados entre execuções do programa.

## Organização do Kanban

https://github.com/users/fe-l-i-p-e/projects/1/views/1

## Branches utilizadas

- main — versão estável do projeto
- develop — branch de integração
- feat/pokedex — desenvolvimento das funcionalidades principais
- docs/readme — documentação

## Melhorias futuras

- Criar menu interativo com loop contínuo
- Implementar remoção de Pokémon da Pokédex por ID
- Exibir HP, ataque e defesa do Pokémon
- Criar filtros por tipo
- Criar API própria com Express