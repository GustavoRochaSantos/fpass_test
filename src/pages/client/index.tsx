// -- Imports Gerais
import React, { useEffect, useState, FormEvent } from 'react';
import {
  Container,
  Panel,
  Button,
  Error,
  PanelAction,
  Pagination,
} from './styles';
import DB from '../../database';
import { ClientFields } from '../../database/interface';
import { FiEdit, FiDelete } from 'react-icons/fi';
import validCPF from '../../util/validCPF';
import formatPhoneMask from '../../util/formatPhoneMask';
import Field from '../../components/input';
import ValidDate from '../../util/validDate';
import Popup from '../../components/popup';
import formatCPFMask from '../../util/formatCPFMask';

// -- Estado incial do Formulario
const InitialStateForm: ClientFields = {
  name: '',
  address: '',
  mail: '',
  birtday: '',
  cpf: '',
  obs: '',
  phone: '',
};

// -- Variável de conexão com o banco fake
const database = new DB();

const ClientList: React.FC = () => {
  // -- Variáveis controladas
  const [clientList, setClientList] = useState<ClientFields[]>([]);
  const [editFormData, setEditFormData] = useState<ClientFields>(
    InitialStateForm,
  );
  const [textFilter, setTextFilter] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');
  const [formAtualPage, setFormAtualPage] = useState<number>(1);
  const [formTotalPage, setFormTotalPage] = useState<number>(1);
  const [formTotalPageList, setFormTotalPageList] = useState<number[]>([]);

  // -- Hooks
  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    load();
  }, [formAtualPage, textFilter]);

  useEffect(() => {
    const listPages = [];
    for (let count = 1; count <= formTotalPage; count++) {
      listPages.push(count);
    }
    setFormTotalPageList(listPages);
  }, [formTotalPage]);

  // -- Função destinada a limpar tudo e começar de novo (Refresh)
  function resetAll() {
    load();
    setModalTitle('Cadastro de Cliente');
    setEditFormData(InitialStateForm);
    setModalState(false);
  }

  // -- Busca os dados do banco
  function load() {
    const response = database.getAll(textFilter, formAtualPage);
    setFormTotalPage(response.totalPages);
    setClientList(response.data);
  }

  // -- Cuida de qual modo deve chamar o modal
  function handleModalData(mode: string, client: ClientFields) {
    setModalMode(mode);

    switch (mode) {
      // -- Se for INSERT, limpa o formulario
      case 'INS':
        setModalTitle('Cadastro de Cliente');
        setEditFormData(InitialStateForm);
        break;
      case 'UPD':
        setModalTitle('Edição de Cliente');
        break;
      case 'DLT':
        setModalTitle('Exclusão de Cliente');
        break;
    }

    // -- Mostra o Modal
    setModalState(true);

    // -- Se já existe dados, seta no form
    if (client) setEditFormData(client);
  }

  // -- Envia os dados do filtro, ativando o hook de atualização dos dados
  function handleFilter(event: FormEvent<HTMLInputElement>) {
    const filter = event.currentTarget.value;
    setFormAtualPage(1);
    setTextFilter(filter);
  }

  // -- Função para validar todos os dados do Formulario
  function getErrors() {
    // -- Cria nova lista e limpa o Array
    const newErrors = [];
    setErrors([]);

    // -- Campos obrigatórios
    if (!editFormData.cpf) newErrors.push('Campo CPF é obrigatório!');

    if (!editFormData.name) newErrors.push('Campo NOME é obrigatório!');

    if (!editFormData.birtday)
      newErrors.push('Campo DATA NASCTO é obrigatório/inválida!');

    if (!editFormData.phone) newErrors.push('Campo CELULAR é obrigatório!');

    if (!editFormData.mail) newErrors.push('Campo EMAIL é obrigatório!');

    if (!editFormData.address) newErrors.push('Campo ENDEREÇO é obrigatório!');

    // -- Validações diversas
    if (editFormData.name.match(/[^\d\w\sÀ-ú]/gm))
      newErrors.push('Campo NOME não aceita caracteres especiais!');

    if (!validCPF(editFormData.cpf)) newErrors.push('O CPF não é válido!');

    if (!ValidDate(editFormData.birtday))
      newErrors.push('A DATA NASCTO não é válida!');

    if (
      !editFormData.mail.match(
        /^([\w-]+(?:.[\w-]+))@((?:[\w-]+.)\w[\w-]{0,66}).([a-z]{2,6}(?:.[a-z]{2})?)$/gim,
      )
    )
      newErrors.push('O EMAIL não é valido!');

    // -- Retorna a nova lista de erros
    return newErrors;
  }

  // -- Trata o submit do formulário
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // -- Se for DELETE, exclui o cliente do formulário
    if (modalMode === 'DLT') {
      database.deleteClient(editFormData);
    } else {
      // -- Busca Erros de validação
      const newErrors = getErrors();

      // -- Se existirem, mostra os erros
      if (newErrors.length > 0) {
        setErrors(newErrors);
      } else {
        // -- Senão, grava as informações no banco
        database.setClient(editFormData);
      }
    }

    // -- Depois de tudo, REFRESH
    resetAll();
  }

  // -- Trata as alterações de campo Input
  function handleFieldInputChange(event: FormEvent<HTMLInputElement>) {
    const { id, value } = event.currentTarget;

    // -- Cria uma cópia dos dados gravados
    const newFormData = editFormData;

    // -- Verifica qual é o campo e altera o conteudo
    switch (id) {
      case 'cpf':
        newFormData.cpf = formatCPFMask(value);
        event.currentTarget.value = formatCPFMask(value);
        break;
      case 'name':
        newFormData.name = value;
        break;
      case 'birtday':
        newFormData.birtday = value;
        break;
      case 'phone':
        event.currentTarget.value = formatPhoneMask(value);
        newFormData.phone = formatPhoneMask(value);
        break;
      case 'address':
        newFormData.address = value;
        break;
      case 'mail':
        newFormData.mail = value;
        break;
    }

    // -- Grava os dados do formulario no STATE
    setEditFormData(newFormData);
  }

  function handleFieldTextAreaChange(event: FormEvent<HTMLTextAreaElement>) {
    // -- Cria uma cópia dos dados gravados
    const newFormData = editFormData;

    // -- Verifica qual é o campo e altera o conteudo
    newFormData.obs = event.currentTarget.value;

    // -- Grava os dados do formulario no STATE
    setEditFormData(newFormData);
  }

  // -- Controla as visualizações do MODAL
  function handleTogglePopup() {
    const modal = !modalState;
    setModalState(modal);
  }

  return (
    <Container>
      <PanelAction>
        <Button
          action="true"
          onClick={() => handleModalData('INS', InitialStateForm)}
        >
          Novo
        </Button>
        <Field
          id="filterField"
          type="text"
          placeholder="Pesquisar"
          defaultValue={textFilter}
          InputChange={handleFilter}
        />
      </PanelAction>
      <Panel>
        <table>
          <thead>
            <tr>
              <td></td>
              <td></td>
              <td>CPF</td>
              <td>Nome</td>
              <td>Nascimento</td>
              <td>Celular</td>
              <td>E-mail</td>
              <td>Endereço</td>
              <td>Observação</td>
            </tr>
          </thead>
          <tbody>
            {clientList.map(client => (
              <tr key={client.cpf}>
                <td>
                  <FiEdit onClick={() => handleModalData('UPD', client)} />
                </td>
                <td>
                  <FiDelete onClick={() => handleModalData('DLT', client)} />
                </td>
                <td>{client.cpf}</td>
                <td>{client.name}</td>
                <td>{client.birtday}</td>
                <td>{client.phone}</td>
                <td>{client.mail}</td>
                <td>{client.address}</td>
                <td>{client.obs}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={9}>
                <Pagination>
                  <span>{`Página ${formAtualPage} de ${formTotalPage}`}</span>
                  <div>
                    <a
                      id="prev"
                      href="#"
                      onClick={() =>
                        setFormAtualPage(
                          formAtualPage > 1 ? formAtualPage - 1 : formAtualPage,
                        )
                      }
                    >
                      Ant
                    </a>
                    {formTotalPageList.map(item => (
                      <a
                        key={item}
                        id="page"
                        href="#"
                        onClick={() => setFormAtualPage(item)}
                        className={item === formAtualPage ? 'actualPage' : ''}
                      >
                        {item}
                      </a>
                    ))}

                    <a
                      id="next"
                      href="#"
                      onClick={() =>
                        setFormAtualPage(
                          formTotalPage > formAtualPage
                            ? formAtualPage + 1
                            : formAtualPage,
                        )
                      }
                    >
                      Próx.
                    </a>
                  </div>
                </Pagination>
              </td>
            </tr>
          </tfoot>
        </table>
      </Panel>

      {modalState ? (
        <Popup clickBackground={handleTogglePopup}>
          <h3>{modalTitle}</h3>
          {errors.map(message => (
            <Error key={message}>{message}</Error>
          ))}

          <form onSubmit={handleSubmit} noValidate>
            <Field
              required
              label="CPF"
              id="cpf"
              type="text"
              defaultValue={editFormData.cpf}
              InputChange={handleFieldInputChange}
            />
            <Field
              id="name"
              label="Nome"
              type="text"
              defaultValue={editFormData.name}
              InputChange={handleFieldInputChange}
              required
            />
            <Field
              required
              label="Data Nascto"
              id="birtday"
              type="date"
              defaultValue={editFormData.birtday}
              InputChange={handleFieldInputChange}
            />
            <Field
              required
              label="Celular"
              id="phone"
              type="phone"
              defaultValue={editFormData.phone}
              InputChange={handleFieldInputChange}
            />
            <Field
              required
              label="Email"
              id="mail"
              type="email"
              defaultValue={editFormData.mail}
              InputChange={handleFieldInputChange}
            />
            <Field
              required
              label="Endereço"
              id="address"
              type="text"
              defaultValue={editFormData.address}
              InputChange={handleFieldInputChange}
            />
            <Field
              field="textarea"
              label="Observações"
              id="obs"
              type="text"
              defaultValue={editFormData.obs}
              TextAreaChange={handleFieldTextAreaChange}
              maxLength={300}
            />
            <div>
              <Button type="submit">Confirmar</Button>
              <Button cancel onClick={handleTogglePopup}>
                Cancelar
              </Button>
            </div>
          </form>
        </Popup>
      ) : null}
    </Container>
  );
};

export default ClientList;
