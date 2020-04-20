import React from "react";

/**
 * As propriedades de um componente, cujo o qual, o mesmo vem de um pai para um Filtro,
 * são justamente, o parâmetro da função que o componente executa e a retorna.
 * @param {*} param0
 */
export default function Header({ title }) {
  return (
    <header>
      <h1>React JS {title}</h1>
    </header>
  );
}
