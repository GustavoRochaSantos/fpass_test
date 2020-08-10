import { ClientFields, ClientPagination } from './interface';

class DB {
  // -- Variável de Clientes Global
  private clients: ClientFields[] = [];

  // -- Chave pra guardar no localStorage
  private localStorageKey = '#FPASS_clientList';

  constructor() {
    // -- Verifica se já existem dados no LocalStorage
    const localStorageClients = localStorage.getItem(this.localStorageKey);

    // -- Se existem, carrega os dados
    if (localStorageClients) {
      const parseClients: ClientFields[] = JSON.parse(localStorageClients);

      parseClients.forEach(client => this.clients.push(client));
    }
  }

  // -- Rotina que controla os dados no LocalStorage
  setLocalStorageData(): void {
    const parsedClients = JSON.stringify(this.clients);
    localStorage.setItem(this.localStorageKey, parsedClients);
  }

  // -- Rotina que retorna somente 1 cliente
  getOne(cpf: string): ClientFields {
    const existClient = this.clients.filter(client => client.cpf === cpf)[0];

    return existClient;
  }

  // -- Rotina que retorna os dados, com filtros
  getAll(textFilter = '', page = 1): ClientPagination {
    // -- Deixa tudo minusculo
    const lowerTextFilter = textFilter.toLowerCase();

    // -- Filtra os dados
    const clientListFiltered = this.clients.filter(client => {
      // -- Se não tem filtro, retorna
      if (!lowerTextFilter) {
        return client;
      }
      // -- Se tem filtro, retorna somente os que forem encontrados
      else {
        const clientString = JSON.stringify(client).toLowerCase();
        if (clientString.includes(lowerTextFilter)) {
          return client;
        }
      }
    });

    // -- Cria a paginação, somente 10 registros por pagina
    const startIndex = 0 + page * 10 - 10;
    const lastIndex = startIndex + 10;

    // -- Tira da lista filtrada, somente os dados da pagina selecionada
    const clientList = clientListFiltered.slice(startIndex, lastIndex);

    // -- Cria a variavel de paginação completa
    const response: ClientPagination = {
      records: clientList.length,
      page,
      totalPages: Math.ceil(clientListFiltered.length / 10),
      data: clientList,
    };

    // -- Retorna os dados paginados
    return response;
  }

  // -- Cria/Altera dados
  setClient(client: ClientFields): void {
    // -- Busca o indice pelo CPF
    const index = this.clients.findIndex(item => item.cpf === client.cpf);
    // -- Se encontrou algo, altera o cliente atual
    if (index !== -1) {
      this.clients[index] = client;
    } else {
      // Senaõ, cria um novo
      this.clients.push(client);
    }

    // -- Atualiza localStorage
    this.setLocalStorageData();
  }

  deleteClient(client: ClientFields): void {
    // -- Busca o indice pelo CPF
    const index = this.clients.findIndex(item => item.cpf === client.cpf);

    // -- Se encontrou algo, deleta o cliente atual
    if (index !== -1) {
      this.clients.splice(index, 1);
    }

    // -- Atualiza localStorage
    this.setLocalStorageData();
  }
}

export default DB;
