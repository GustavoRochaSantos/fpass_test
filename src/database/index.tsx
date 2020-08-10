import ClientFields from './interface';

class DB {
  private clients: ClientFields[] = [];
  private localStorageKey = '#FPASS_clientList';

  constructor() {
    const localStorageClients = localStorage.getItem(this.localStorageKey);
    if (localStorageClients) {
      const parseClients: ClientFields[] = JSON.parse(localStorageClients);

      parseClients.forEach(client => this.clients.push(client));
    }
  }

  setLocalStorageData(): void {
    console.log('antes', this.clients);
    const parsedClients = JSON.stringify(this.clients);
    console.log('parsedClients', parsedClients);
    localStorage.setItem(this.localStorageKey, parsedClients);
  }

  getAll(textFilter: string): ClientFields[] {
    console.log('textFilter: ', textFilter);
    const lowerTextFilter = textFilter.toLowerCase();
    console.log(lowerTextFilter);
    return this.clients;
    // if (!textFilter) {
    //   return this.clients;
    // } else {
    //   const filteredClients = this.clients.filter(client => {
    //     if (
    //       client.address.includes(lowerTextFilter) ||
    //       client.birtday.includes(lowerTextFilter) ||
    //       client.name.includes(lowerTextFilter) ||
    //       client.mail.includes(lowerTextFilter) ||
    //       client.cpf.includes(lowerTextFilter) ||
    //       client.obs.includes(lowerTextFilter) ||
    //       client.phone.includes(lowerTextFilter)
    //     ) {
    //       return client;
    //     }
    //   });

    //   return filteredClients;
    // }
  }

  setClient(client: ClientFields): void {
    const index = this.clients.findIndex(item => item.cpf === client.cpf);
    console.log(index);
    if (index !== -1) {
      console.table(this.clients);
      this.clients[index] = client;
      console.table(this.clients);
    } else {
      this.clients.push(client);
    }
    console.table(this.clients);
    this.setLocalStorageData();
  }

  deleteClient(client: ClientFields): void {
    const index = this.clients.findIndex(item => item.cpf === client.cpf);
    if (index !== -1) {
      this.clients.splice(index, 1);
    }

    this.setLocalStorageData();
  }
}

export default DB;
