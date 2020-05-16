import React, { useRef, useCallback } from "react";
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
import { Container, Title, BackToSignIn, BackToSignInText } from "./styles";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      /**
       * Esquema de validação
       * Bem semelhante ao celebrate, o esquema de validação acaba sendo a
       * mesma coisa.
       */
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().min(6, "No mínimo 6 dígitos ")
      });

      /**
       * AbortEarly: retorna todos os erros e não o primeiro que ele encontrar.
       */
      await schema.validate(data, { abortEarly: false });

      // await api.post("/users", data);

      Alert.alert(
        "Cadastro Realizado",
        "Você já pode fazer seu logon no GoBarber!"
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        "Erro no Cadastro",
        "Ocorreu um erro ao fazer cadastro, tente novamente"
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
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
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
                // Cria uma nova senha ao invés de usar uma sugestão do proprio sistema
                // textContentType como oneTimeCode --> É preenchido automático ao receber
                // o sms.
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Botão para criar a conta fora do container pois ele possui um position absolute. */}
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para Logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
