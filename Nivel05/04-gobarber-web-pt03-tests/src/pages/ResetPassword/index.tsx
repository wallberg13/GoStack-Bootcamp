import React, { useCallback, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import query from "query-string";
import * as Yup from "yup";

import { useToast } from "../../hooks/toast";

import { Container, Content, Background, AnimationContainer } from "./styles";
import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../services/api";

/**
 * useContext: hook para obter informações de contexto.
 */
interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const { token } = query.parse(location.search);

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required("Senha obrigatória"),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Confirmação incorreta"
          )
        });

        /**
         * AbortEarly: retorna todos os erros e não o primeiro que ele encontrar.
         */
        await schema.validate(data, { abortEarly: false });

        const { password, password_confirmation } = data;

        if (!token) {
          throw new Error();
        }

        await api.post("/password/reset", {
          token,
          password,
          password_confirmation
        });

        history.push("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        // disparar um toast
        addToast({
          title: "Erro ao resetar senha",
          description: "Ocorreu um erro ao resetar sua senha, tente novamente.",
          type: "error"
        });
      }
    },
    [addToast, history, token]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
