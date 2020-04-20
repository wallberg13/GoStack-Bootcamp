// Arquivo de configurações do babel -> tudo isolado.
// Maneira que o JS é convertido para um código que o Browser entenda.
module.exports = {
  // Conjunto de configuração criados por terceiros
  presets: [
    // Converte o JS mais "moderno" em JS mais "antigo" baseado no ambiente da nossa aplicação.
    // Obtem o que os browsers ainda não entendem, e faz a transpilação somente do que for necessário.
    // Pode ser utilizado até pelo o proprio NodeJS. Env vai entender o ambiente que está sendo utilizado.
    // Sempre os default.
    "@babel/preset-env",
    // Adicionar as funcionalidades do React na conversão do código.
    "@babel/preset-react",
  ],

  // Pelo o visto, o babel não aceita async await do jeito que estava ali, e por isso, deu
  // o erro de runtime
  plugins: ["@babel/plugin-transform-runtime"],
};
