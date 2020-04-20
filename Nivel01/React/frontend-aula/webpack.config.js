const path = require("path");

/**
 * O Webpack faz o que o babel não faz, consegue importar a galera que o JS não consegue.
 * Automatiza esse processo do tipo de arquivo que é requisitado na aplicação e acionar um loader.
 * Para lidar com Caminho, sempre usamos o path
 */
module.exports = {
  // Ponto de entrada da nossa aplicação
  // E o mesmo já permite o uso de importações.
  entry: path.resolve(__dirname, "src", "index.js"),

  // Arquivo de saida.
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },

  // Para ativar o Live Reload
  devServer: {
    // Basicamente, o caminho para o diretório que contém os arquivos publicos da aplicação.
    contentBase: path.resolve(__dirname, "public"),
  },

  module: {
    // Conjunto de Regras
    // Cada objeto é um loader diferente
    rules: [
      /**
       * Instruções Numero 01
       * Toda vez que for precisar de um arquivo .js, e este mesmo não estiver na pasta de node_modules,
       * converta utilizando o babel-loader.
       */
      {
        test: /\.js$/, // O Webpack vai converter todos os arquivos.js da aplicação
        exclude: /node_modules/, // E vai excluir os arquivos em node_modules, pois estes, é de responsabilidade do babel.
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            // Vai pegar o CSS que foi interpretado anteriormente, e fará a injeção dos estilos
            // diretamente no HTML.
            loader: "style-loader",
          },
          {
            // Basicamente vai conseguir ler o arquivo CSS, e vai conseguir interpretar as importações
            // que acontecem dentro do proprio css.
            loader: "css-loader",
          },
        ],
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i, // I no final da regex, transforma a mesma em Case Insensitive
        use: {
          // Basicamente, vai conseguir importar qualquer tipo de arquivo, seja imagem
          // ou qualquer outra coisa.
          loader: "file-loader",
        },
      },
    ],
  },
};
