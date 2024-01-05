import React from "react";
import { useForm } from "react-hook-form";
import Logo from "../../public/Logo.svg";

const FormCard = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <img src={Logo} alt="" />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          id="email"
          {...register("email", { required: "Campo obrigatório" })}
        />
        {errors && errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Campo obrigatório",
            minLength: {
              value: 6,
              message: "A senha deve ter pelo menos 6 caracteres",
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              message:
                "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número",
            },
          })}
        />
        {errors && errors.password && <span>{errors.password.message}</span>}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormCard;
