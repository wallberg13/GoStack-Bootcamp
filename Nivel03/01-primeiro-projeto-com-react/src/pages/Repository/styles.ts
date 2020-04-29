import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* O Link se comporta como um ancora */
  a {
    display: flex; /** FlexBox é vida */
    align-items: center; /** Alinha ao centro */
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 80px;
  margin-bottom: 100px;

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
