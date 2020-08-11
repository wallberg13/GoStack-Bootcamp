module.exports = {
  // Converte o código para a versão atual do Node que estejamos utilizando no momento da conversão.
  // Padrão de config: [<nome-preset>, { < object com configuração > }]
  presets: [
    ["@babel/preset-env", { targets: { node: 10 } }],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@modules": "./src/modules",
          "@config": "./src/config",
          "@shared": "./src/shared"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ]
};
