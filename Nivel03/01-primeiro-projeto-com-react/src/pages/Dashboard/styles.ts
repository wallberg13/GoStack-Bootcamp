import styled, { css } from "styled-components";
import { shade } from "polished";

interface FormProps {
  hasError: boolean;
}

//
// Template Literals
//
export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`;

/**
 * Encadeamentos de CSS.
 *
 * SASS, LESS: Préprocessadores de CSS.
 *
 * -> Adicionando Parametros de Função
 */
export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;

    /* Foi adicionado uma borda fantasminha aqui, que na hora que existe um erro,
       a mesma dá um alerta.
       Em StyledComponent (preciso até pesquisar essa sitaxe do JS), quando eu chamo uma
       ArrowFunction, o mesmo possui as props dentro da chamada e com o css eu posso escrever
       css dentro da mesma.
    */
    border: 2px solid #fff;
    border-right: 0;
    ${(props) => props.hasError && css`
      border-color: #c53030;
    `}


    /* Estilizando as propriedades do proprio componente (nao sei se é isso que entendi) */
    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    /** Outro Hack - Border RADIUS igual à 50% do heigh, forma uma parte da circuferência */
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    /* Se referênciando o proprio componente */
    &:hover {
      background: ${shade(0.2, "#04d361")};
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;
  margin-bottom: 100px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    /** Por pardrão, a ancora vem com o display inline do CSS. */
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    /* Colocando um margin top a partir do segundo elemento (e nao do primeiro, pois nao faz sentido);
     * & representa o proprio componente. O a representa componentes do tipo. Então não faz sentido colocar & + &,
     * pois teoricamente, eu não sou precedido de eu mesmo.
     */
    & + a {
      margin-top: 16px;
    }

    &:hover {
      /* Move 10 pixels para algum lado */
      transform: translateX(10px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%; /** Assim, a imagem fica totalmente arredondada, com 50% de border radius */
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      /* Pega todo o espaço disponível da esquerda e joga para o lado*/
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
