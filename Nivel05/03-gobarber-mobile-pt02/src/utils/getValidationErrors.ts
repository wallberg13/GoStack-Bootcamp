import { ValidationError } from "yup";

/**
 * Declarando que a chave do objeto pode ser
 * qualquer coisa, no lado esquerdo da declaração.
 * O nome key não muda em nada.
 */
interface Errors {
  [key: string]: string;
}

export default function getValidateErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });
  return validationErrors;
}
