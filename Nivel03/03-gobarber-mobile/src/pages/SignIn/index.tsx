import React, { useCallback, useRef } from "react";
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logoImg from "../../assets/logo.png";
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from "./styles";

const SignIn: React.FC = () => {
  // Criamos uma Ref no react quando queremos manusear um elemento pela forma
  // direta e não por outra referência.
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <>
      {/*
         KeyboardAvoidingView -> Comportamento desejado para quando o teclado aparecer em tela
         e o mesmo permitir que quando o usuário dá um toque fora da tela, ele seja fechado.

         -> O comportamento no Android de quando o teclado é aberto, o mesmo leva todos os componentes
            em tela para cima, o ideal, é escutar um evento de quando o teclado é aberto ou não, e caso afirmativo,
            não renderizar tal componente.
        */}
      <KeyboardAvoidingView
        style={{ flex: 1 }} // Flex 1 para ocupar toda a janela
        // Platform é uma lib do React-Native que indentifica em qual plataforma estamos desenvolvendo.
        //
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled // Mantem habilitado por padrao
      >
        {/* ScrollView é para quando o conteúdo em tela extrapolar, o mesmo ter a possibilidade de está dentro do scroll*/}
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu Logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button
                // No react-native, não EXISTE SUBMIT NOS BUTTONS, portanto,
                // nós precisamos fazer isso manual, atráves da Referencia do Formulário
                // quando utilizamos o FormRef. Com isso, iremos executar uma ação de submit
                // no mesmo, para que ele chame a nossa função de submissão.
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Botão para criar a conta fora do container pois ele possui um position absolute. */}
      <CreateAccountButton onPress={() => navigation.navigate("SignUp")}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma Conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
