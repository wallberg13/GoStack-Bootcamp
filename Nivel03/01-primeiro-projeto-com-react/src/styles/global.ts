import { createGlobalStyle } from "styled-components";

import githubBackground from "../assets/github-background.svg";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box; /* Verificar Box Model no CSS */
  }

  body {
    /** Cor | Imagem | Opção para Imagem não se repetir | 70% para Direita | Alinha ao Topo */
    background: #F0F0F5 url(${githubBackground}) no-repeat 70% top;
    -webkit-font-smoothing: antialiased; /** Só funciona no Chrome */
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  #root {
    /** Max: Tamanho Maximo */
    max-width: 960px;
    margin: 0 auto; /** (Cima e Baixo) (Direita e Esqueda - Auto: centraliza) */
    padding: 40px 20px; /** (Cima e Baixo) (Direita e Esquerda) */
  }

  button {
    cursor: pointer;
  }
`;
