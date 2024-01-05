import React from "react";
import { useForm } from "react-hook-form";

const FormCard = ({ onSubmit }) => {
  const { handleSubmit, register, errors } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      // Redirecionamento ou outras ações após o envio bem-sucedido
    } catch (error) {
      // Tratar erros, exibir mensagens, etc.
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="email">E-mail:</label>
        <input {...register("email", { required: "Campo obrigatório" })} />
        {errors.email && <span>{errors.email.message}</span>}

        {/* Adicione outros campos conforme necessário */}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormCard;
