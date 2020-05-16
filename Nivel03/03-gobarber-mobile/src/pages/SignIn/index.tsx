import React, { useCallback, useRef } from "react";
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import getValidationErrors from "../../utils/getValidationErrors";
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

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  // Criamos uma Ref no react quando queremos manusear um elemento pela forma
  // direta e não por outra referência.
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha obrigatória")
      });

      /**
       * AbortEarly: retorna todos os erros e não o primeiro que ele encontrar.
       */
      await schema.validate(data, { abortEarly: false });

      // await signIn({ email: data.email, password: data.password });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        "Erro na autenticação",
        "Ocorreu um erro ao fazer login, cheque as credenciais."
      );
    }
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
              {/* Deixando os inputs melhores, com um formato mais ideal para o usuário */}
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                // Função disparada ao pressionar o return do teclado (um enter por exemplo)
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

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
