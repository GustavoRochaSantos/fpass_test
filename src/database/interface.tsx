/**
 * Arquivo com as interfaces de dados do Cliente
 */

export interface ClientFields {
  cpf: string;
  name: string;
  birtday: string;
  phone: string;
  mail: string;
  address: string;
  obs: string;
}

export interface ClientPagination {
  page: number;
  totalPages: number;
  records: number;
  data: ClientFields[];
}
