import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback
} from "react";
import { IconBaseProps } from "react-icons";
import { useField } from "@unform/core";
import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

/**
 * Renomenado o icon, pois o React não aceita componentes com a primeira letra
 * minuscula.
 *
 * useCallback: é uma forma de criar funções dentro do componente sem que a mesma
 * seja "recriada" em memória toda vez que o componente é atualizado. Ou seja, o componente
 * passa a ter memória. Possui os mesmos parâmetros do useEffect, com diferença que
 * esta mesma é criada para funções. No segundo parâmetro, ele diz que toda vez que
 * uma váriavél for alterada, a função precisa ser recriada.
 *
 */
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  // useRef faz com que possamos fazer manipulações em cada elemento isolado (ou componentes)
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, error, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    // Path: caminho para obter o valor do Input.
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error}
    </Container>
  );
};

export default Input;
