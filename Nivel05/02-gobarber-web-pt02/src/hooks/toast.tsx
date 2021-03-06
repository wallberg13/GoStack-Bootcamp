import React, { createContext, useContext, useCallback, useState } from "react";
import { uuid } from "uuidv4";
import ToastContainer from "../components/ToastContainer";

export interface ToastMessage {
  id: string;
  type?: "sucess" | "error" | "info";
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast({ title, type, description }: Omit<ToastMessage, "id">): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, type, description }: Omit<ToastMessage, "id">) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description
      };

      /**
       * COISA NOVA PARA O USO DO SET, DESCRITO PELO O USESTATE.
       * QUANDO O PARÂMETRO É UMA FUNÇÃO, ELE CHAMA ESSA FUNÇÃO POSSUINDO COMO PARÂMETRO NA SUA CHAMADA,
       * O VALOR ANTIGO DO ESTADO.
       */
      setMessages((state) => [...state, toast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

export { ToastProvider, useToast };
