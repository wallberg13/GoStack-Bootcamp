import React, { useCallback, useRef, ChangeEvent } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import api from "../../services/api";

import { useToast } from "../../hooks/toast";
import { useAuth, User } from "../../hooks/auth";

import getValidationErrors from "../../utils/getValidationErrors";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, AvatarInput } from "./styles";

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
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
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: (val) => !!val.length,
            then: Yup.string().required("Campo Obrigatório"),
            otherwise: Yup.string()
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: (val) => !!val.length,
              then: Yup.string().required("Campo Obrigatório"),
              otherwise: Yup.string()
            })
            .oneOf([Yup.ref("password"), null], "Confirmação incorreta")
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation
        } = data;
        /**
         * AbortEarly: retorna todos os erros e não o primeiro que ele encontrar.
         */
        await schema.validate(data, { abortEarly: false });

        const formData = Object.assign(
          {
            name,
            email
          },
          old_password
            ? {
                old_password,
                password,
                password_confirmation
              }
            : {}
        );

        const newUser = await api.put<User>("/profile", formData);

        updateUser(newUser.data);

        history.push("/");

        addToast({
          type: "sucess",
          title: "Perfil Atualizado",
          description:
            "Suas informações do perfil foram atualizadas com sucesso"
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        // disparar um toast
        addToast({
          title: "Erro na Atualização",
          description: "Ocorreu um erro ao atualizar cadastro, tente novamente",
          type: "error"
        });
      }
    },
    [addToast, updateUser, history]
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append("avatar", e.target.files[0]);

        api.patch("/users/avatar", data).then((response) => {
          addToast({
            type: "sucess",
            title: "Avatar atualizado!!"
          });

          updateUser(response.data);
        });
      }
    },
    [addToast, updateUser]
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        {/* Pegando um registro
          Colocando uma propriedade chamdada initialData, eu seto o
          meu componente com um valor padrão. E a key deve ser o mesmo nome
          do input.
        */}
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar Mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
