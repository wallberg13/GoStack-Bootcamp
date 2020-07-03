import styled, { css } from "styled-components";

import Tooltip from "../Tooltip";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  border: 2px solid #232129;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  /**
    Sempre lembrando que a ordem das coisas importam:
    -> Se tem erro, mas tem foco, o ideal é ter a borda de foco.
   */
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}



  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

/**
 * O Styled component permite que a gente aplique estilização em componentes
 * personalizados, no caso, o Tooltip. Essa estilização é aplicada em cima do Container
 * raiz que foi criado neste componente.
 */
export const Error = styled(Tooltip)`
  /* Deixando fixo o tamanho da DIV para o tamanho do SVG */
  height: 20px;
  margin-left: 16px; /** Para garantir que o texto não chegue no erro */
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
