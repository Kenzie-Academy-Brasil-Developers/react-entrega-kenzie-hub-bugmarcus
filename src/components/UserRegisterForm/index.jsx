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
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          {...register("nome", { required: "Campo obrigatório" })}
        />
        {errors && errors.nome && <span>{errors.nome.message}</span>}
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          id="email"
          {...register("email", { required: "Campo obrigatório" })}
        />
        {errors && errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          {...register("senha", { required: "Campo obrigatório" })}
        />
        {errors && errors.senha && <span>{errors.senha.message}</span>}
        <label htmlFor="confirmarsenha">Confirmar senha:</label>
        <input
          type="password"
          id="confirmarsenha"
          {...register("confirmarsenha", { required: "Campo obrigatório" })}
        />
        {errors && errors.confirmarsenha && (
          <span>{errors.confirmarsenha.message}</span>
        )}
        <label htmlFor="bio">Bio:</label>
        <input
          type="text"
          id="bio"
          {...register("bio", { required: "Campo obrigatório" })}
        />
        {errors && errors.bio && <span>{errors.bio.message}</span>}
        <label htmlFor="contato">Contato:</label>
        <input
          type="text"
          id="contato"
          {...register("contato", { required: "Campo obrigatório" })}
        />
        {errors && errors.contato && <span>{errors.contato.message}</span>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default FormCard;
