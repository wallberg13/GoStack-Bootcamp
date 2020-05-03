import styled from "styled-components";

export const Container = styled.div`
  /* Posição relativa a do mesmo para os elementos filhos */
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    /* Deixando o elemento invisivel */
    opacity: 0;
    transition: opacity 0.4s;

    /* Faz com que o elemento esteja invisivel e que não seja renderizado na DOM */
    visibility: hidden;

    /* Posição absoluta em relação ao Container superior */
    position: absolute;
    bottom: calc(100% + 12px);
    /* Ficando no centro, totalmente do elemento de baixo (do SVG) */
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;

    /* Fazendo um triangulo do CSS */
    &::before {
      content: "";
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      /* Centralizando o elemento para a esquerda */
      left: 50%;
      transform: translateX(-50%);
    }
  }

  /* Deixando o elemento visivel */
  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;
