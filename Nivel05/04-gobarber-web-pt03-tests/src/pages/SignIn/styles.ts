import styled, { keyframes } from "styled-components";
import { shade } from "polished";
import signInBackgroundImg from "../../assets/sign-in-background.png";

export const Container = styled.div`
  /** Forçar que o container possua 100% do View Port Height, ou seja,
      100% do tamanho da tela que está sendo exibida.
   */
  height: 100vh;

  /*
    Display Flex faz com que o background e o conteúdo fique um no lado do outro.
    O stretch vai garantir que os dois tomem o total espaço da tela, ele estica o máximo que poder.
   */
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  place-content: center;
  /*
    Place-Concent diz que tudo e qualquer coisa
    que seja colocada no componente, vai ficar no centro
  */

  width: 100%;
  /* Nunca passa dessa quantidade de pixels */
  max-width: 700px;
`;

export const Background = styled.div`
  /* Faz com que o componente ocupe todo o espaço disponivel para o mesmo, ou seja, é flexível. */
  flex: 1;

  /*
    Adicionando a imagem de fundo, para não repetir e fica centralizada
   */
  background: url(${signInBackgroundImg}) no-repeat center;
  /* O cover faz com que o background ocupe toda a parte do container, mesmo que ele nao ocupe todo o espaço,
     e é um fato muito importante para a responsividade da aplicação.
   */
  background-size: cover;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  place-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#f4ede8")};
      }
    }
  }

  /* Estilizando somente as ancoras que estão vindo diretamente do meu content, e não mais
     um nivel para dentro.
   */
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, "#ff9000")};
    }
  }
`;
