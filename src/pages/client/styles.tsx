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

  thead {
    background-color: #ffffff;
    border: 1px solid gray;
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
