import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from "react";
import { TextInputProps } from "react-native";

import { useField } from "@unform/core";

import { Container, TextInput, Icon } from "./styles";

/**
 * Hook useImperativeHandle: passando propriedades de um componente filho para um pai
 *
 *
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
  containerStyle?: object;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

// Refererencias não são adicionadas via propriedade, e sim como um segundo
// campo da função
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, containerStyle = {}, ...rest },
  ref
) => {
  const inputElementRef = useRef<any>(null);
  // Definindo a referencia do Value e colocando um valor inicial para o input.
  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

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
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? "#ff9000" : "#666360"}
      />
      <TextInput
        ref={inputElementRef} // Criando a referência para o input
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        // Momento que o input ganha foco
        onFocus={handleInputFocus}
        // Momento que o input perde foco
        onBlur={handleInputBlur}
        // Colocando o texto digitado pelo o usuário e colocando naquela referência.
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
