import React from "react";
import { TextInputProps } from "react-native";

import { Container, TextInput, Icon } from "./styles";

/**
 * Instalação no Mac do react-native-vector-icons, para finalizar, é necessário
 * utilizar o cocoapod dentro da pasta ios. No Android é automatico.
 *
 * -> No IOS (dentro do Info.plist, lá onde instalamos as fontes),
 *    é necessário passar o pacote de icones svg que utilzaremos, que no caso, é
 *    o Feather.ttf
 *
 * -> No Android, precisamos em android/app/build.grandle, adicionar o seguinte trecho
 *    de código:
      project.ext.vectoricons = [
        iconFontNames: "Feather.ttf"
      ]

      apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
 *
 *
 */

interface InputProps extends TextInputProps {
  name: string;
  icon: string; // Tem uma diferença entre como podemos passar um componente de icone.
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        {...rest}
      />
    </Container>
  );
};

export default Input;
