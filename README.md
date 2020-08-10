# FPass Test
This is my test to join your team, enjoy!

### Installation

Execute the command above in terminal, to clone the project
```sh
$ git clone https://github.com/GustavoRochaSantos/fpass_test.git
```
Install the dependencies and devDependencies and start the server.

```sh
$ cd fpass_test
$ yarn or npm install
```

Run project.

```sh
$ yarn start
```

### Production Dependencies

| Package | Link |
| ------ | ------ |
| ReactIcons | https://www.npmjs.com/package/react-icons |
| styled-components | https://www.npmjs.com/package/styled-components |

### Development Dependencies

| Package | Link |
| ------ | ------ |
| Typescript | https://www.npmjs.com/package/typescript |
| ESLint | https://www.npmjs.com/package/eslint |
| Prettier | https://www.npmjs.com/package/prettier |


### Database
One of goals was make a localdatabase, so i used a LocalStorage to record all data in ./src/database/

### Project Structure
```bash
├── README.md
├── package.json
├── prettier.config.js
├── public
|  └── index.html
├── src
|  ├── components
|  |  ├── input
|  |  |  ├── index.tsx
|  |  |  └── style.tsx
|  |  └── popup
|  |     ├── index.tsx
|  |     └── style.tsx
|  ├── database
|  |  ├── index.tsx
|  |  └── interface.tsx
|  ├── index.css
|  ├── index.tsx
|  ├── pages
|  |  └── client
|  |     ├── index.tsx
|  |     └── styles.tsx
|  ├── react-app-env.d.ts
|  └── util
|     ├── formatPhoneMask.tsx
|     ├── validCPF.tsx
|     └── validDate.tsx
├── tree.txt
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```

### Goals
#### Implemente um sistema web usando Reactjs com Typescript 

#### 1 - Cadastro
[X] Um cadastro de cliente com Nome, Nascimento, CPF, Celular, E-mail, Endereço e Observação (textarea) e com máscaras nos campos.
##### Validações:
[X]  0) Todos os campos são obrigatórios, exceto observações. (validar antes de tudo)
[X] 1) Nome: Não permitir caracteres especiais (somente letras com ou sem acento).
[X] 2) Nascimento: Validar datas impossíveis (ex.: 32/13/123). Não precisa validar meses com 28, 30, 31 dias.
[X] 3) CPF: Detectar CPF inválido (pode pegar uma função pronta da internet).
[X] 4) Celular: Verificar se possui o dígito 9 no começo. formato: (XX) 9XXXX-XXXX
[X] 5) E-mail: Verificar se possui somente um @, com texto antes e depois.
[X] 6) Observação: Máximo de 300 caracteres.
*) Implementar outras validações são um diferencial.
####  2 -  Uma listagem de clientes com possibilidade de edição e exclusão de registros;
[X] - A listagem deverá¡ ter um filtro textual que efetua a busca em todos os campos por substring case-insensitive;
[X] - A lista deve possuir sempre 10 registros e ser paginada.
#### Considerações finais:
[X] - Todos os dados devem ser salvos localmente, porém deve se ter efeito de requisição
[X] - Comentários no código não são obrigatórios, porém ajudam a validar o seu conhecimento sobre o assunto.
[X] - Opcional: Criar um README com instruções de setup do sistema para podermos executá-lo e avaliar o resultado