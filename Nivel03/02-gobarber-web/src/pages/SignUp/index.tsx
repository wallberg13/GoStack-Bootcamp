import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";

import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, Background, AnimatedContent } from "./styles";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
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
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <AnimatedContent>
          <img src={logoImg} alt="GoBarber" />

          {/* Pegando um registro
          Colocando uma propriedade chamdada initialData, eu seto o
          meu componente com um valor padrão. E a key deve ser o mesmo nome
          do input.
        */}
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1> Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="">
            <FiArrowLeft size={18} />
            Voltar para logon
          </Link>
        </AnimatedContent>
      </Content>
    </Container>
  );
};

export default SignUp;
