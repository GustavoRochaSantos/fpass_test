import styled, { css } from 'styled-components';

interface ButtonProps {
  action?: string;
  cancel?: boolean;
}
export const Container = styled.div`
  padding: 30px;
`;

export const Button = styled.button<ButtonProps>`
  ${props =>
    !props.action &&
    css`
      margin-top: 30px;
    `}

  margin-right: 10px;

  border: 0px;
  background-color: red;
  color: #fff;
  font-weight: bold;

  ${props =>
    props.cancel &&
    css`
      background-color: gray;
    `}
  &:hover {
    background-color: #f55;
    ${props =>
      props.cancel &&
      css`
        background-color: darkgray;
      `}
  }
`;

export const Panel = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  padding: 30px;

  table {
    width: 100%;
    background-color: #ffffff;
    border-collapse: collapse;
    border-width: 1px;
    border-color: #d9d9d9;
    border-style: solid;
    color: #000000;
  }

  table td,
  table th {
    border-width: 1px;
    border-color: #d9d9d9;
    border-style: solid;
    padding: 5px;
  }

  table thead,
  table tfoot {
    background-color: #f7f7f7;
  }
`;

export const PanelAction = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  padding: 15px 30px;

  display: flex;
  justify-content: space-between;
`;

export const Error = styled.small`
  display: block;
  color: red;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: #000;
    text-decoration: none;
  }

  #prev,
  #next,
  #page {
    padding: 2px 5px;
    border: 1px solid #d9d9d9;
  }
`;
