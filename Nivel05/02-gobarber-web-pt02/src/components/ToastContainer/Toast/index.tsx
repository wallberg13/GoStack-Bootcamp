import React, { useEffect } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle
} from "react-icons/fi";
import { ToastMessage, useToast } from "../../../hooks/toast";
import { Container } from "./styles";

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  sucess: <FiCheckCircle size={24} />
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  /**
   * Assim que o componente for executado em tela.
   * Executa uma ação
   *
   * COISA NOVA:
   * -> SE DENTRO DE UM USEEFFECT EU RETORNAR UMA FUNÇÃO, ELA É EXECUTADA NO MOMENTO
   * DA MORTE DO COMPONENTE.
   * E ISSO É PERFEITO PARA COMPONENTES QUE AUTO SE DESTROEM, COMO UM TOAST.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={Number(message.description)} //
      style={style}
    >
      {icons[message.type || "info"]}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
