import React, { useEffect, useState, FormEvent } from 'react';
import { Container, Panel, Button, Error, PanelAction } from './styles';
import DB from '../../database';
import ClientFields from '../../database/interface';
import { FiEdit, FiDelete } from 'react-icons/fi';
import validCPF from '../../util/validCPF';
import Field from '../../components/input';

const InitialStateForm: ClientFields = {
  name: '',
  address: '',
  mail: '',
  birtday: '',
  cpf: '',
  obs: '',
  phone: '',
};
const database = new DB();

const ClientList: React.FC = () => {
  const [clientList, setClientList] = useState<ClientFields[]>([]);
  const [editFormData, setEditFormData] = useState<ClientFields>(
    InitialStateForm,
  );
  const [textFilter, setTextFilter] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [modalMode, setModalMode] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  useEffect(() => {
    resetAll();
  }, []);

  function resetAll() {
    const list = database.getAll('');
    setClientList(list);
    setModalTitle('Cadastro de Cliente');
    setEditFormData(InitialStateForm);
  }
  function load(filter: string) {
    const list = database.getAll(filter);
    setClientList(list);
  }
  function handleModalData(mode: string, client: ClientFields) {
    setModalMode(mode);

    switch (mode) {
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

    if (client) setEditFormData(client);
  }

  function handleFilter(event: FormEvent<HTMLInputElement>) {
    const textFilter = event.currentTarget.value;
    setTextFilter(textFilter);
    load(textFilter);
  }

  function getErrors() {
    const newErrors = [];
    setErrors([]);

    if (!editFormData.cpf) newErrors.push('Campo CPF é obrigatório!');

    if (!editFormData.name) newErrors.push('Campo NOME é obrigatório!');

    if (!editFormData.birtday)
      newErrors.push('Campo DATA NASCTO é obrigatório!');

    if (!editFormData.phone) newErrors.push('Campo CELULAR é obrigatório!');

    if (!editFormData.mail) newErrors.push('Campo EMAIL é obrigatório!');

    if (!editFormData.address) newErrors.push('Campo ENDEREÇO é obrigatório!');

    if (editFormData.name.match(/[^\d\w\sÀ-ú]/gm))
      newErrors.push('Campo NOME não aceita caracteres especiais!');

    if (!validCPF(editFormData.cpf)) newErrors.push('O CPF não é válido!');

    if (editFormData.mail.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i))
      newErrors.push('O EMAIL não é valido!');

    return newErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (modalMode === 'DLT') {
      database.deleteClient(editFormData);
    } else {
      const newErrors = getErrors();

      if (newErrors.length > 0) {
        setErrors(newErrors);
      } else {
        database.setClient(editFormData);
      }
    }
    setEditFormData(InitialStateForm);
    resetAll();
  }

  function handleFieldInputChange(event: FormEvent<HTMLInputElement>) {
    const { id, value } = event.currentTarget;

    const newFormData = editFormData;

    switch (id) {
      case 'cpf':
        newFormData.cpf = value;
        break;
      case 'name':
        newFormData.name = value;
        break;
      case 'birtday':
        newFormData.birtday = value;
        break;
      case 'phone':
        newFormData.phone = value;
        break;
      case 'address':
        newFormData.address = value;
        break;
      case 'mail':
        newFormData.mail = value;
        break;
    }
    setEditFormData(newFormData);
  }

  function handleFieldTextAreaChange(event: FormEvent<HTMLTextAreaElement>) {
    const newFormData = editFormData;
    newFormData.obs = event.currentTarget.value;
    setEditFormData(newFormData);
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
        </table>
      </Panel>

      <Panel>
        <h3>{modalTitle}</h3>
        {errors.map(message => (
          <Error key={message}>{message}</Error>
        ))}

        <form onSubmit={handleSubmit}>
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
            required
            label="Observações"
            id="obs"
            type="text"
            defaultValue={editFormData.obs}
            TextAreaChange={handleFieldTextAreaChange}
            maxLength={300}
          />
          <Button type="submit">Confirmar</Button>
          <Button cancel>Cancelar</Button>
        </form>
      </Panel>
    </Container>
  );
};

export default ClientList;
