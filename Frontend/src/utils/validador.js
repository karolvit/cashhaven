import * as yup from "yup";

export const usuarioSchema = yup.object().shape({
  name: yup
    .string()
    .required("O nome é obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres."),
  cpf: yup
    .string()
    .matches(/^\d{11}$/, "CPF inválido. Deve conter 11 dígitos.")
    .required("O CPF é obrigatório."),

  telefone: yup
    .string()
    .matches(/^\d{10,11}$/, "Telefone inválido. Deve conter 10 ou 11 dígitos.")
    .required("O telefone é obrigatório."),
});
