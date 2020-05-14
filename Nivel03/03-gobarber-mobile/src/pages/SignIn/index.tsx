import React from "react";
import { Image } from "react-native";
import { Container, Title } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";

import logoImg from "../../assets/logo.png";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu Logon</Title>
      <Input name="Caralho Lek" icon="mail" placeholder="E-mail" />
      <Input name="Caralho Lek" icon="lock" placeholder="Senha" />
      <Button onPress={() => {}}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
