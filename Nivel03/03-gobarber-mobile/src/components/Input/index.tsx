import React, { useEffect, useRef } from "react";
import { TextInputProps } from "react-native";

import { useField } from "@unform/core";

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

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);
  // Definindo a referencia do Value e colocando um valor inicial para o input.
  const { registerField, defaultValue = "", fieldName, error } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(ref: any, value: string) {
        // O valor da referencia não é um elemento, portanto, ele não possuí ações
        // em cima do formulário.
        inputValueRef.current.value = value;
        // Essa linha abaixo será responsável por mudar o texto que esta sendo visualmente
        // sendo exibido
        inputElementRef.current.setNativeProps({ text: value });
      }, // O que vai acontecer se o unform quiser setar um valor de forma manual?
      clearValue() {
        inputValueRef.current.value = "";
        inputElementRef.current.clear();
      }
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        ref={inputElementRef} // Criando a referência para o input
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        // Colocando o texto digitado pelo o usuário e colocando naquela referência.
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default Input;
