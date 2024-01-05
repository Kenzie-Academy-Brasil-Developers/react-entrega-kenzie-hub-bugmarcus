import React from "react";
import { useForm } from "react-hook-form";
import Logo from "../../public/Logo.svg";
import { Link } from "react-router-dom";

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
          {...register("password", { required: "Campo obrigatório" })}
        />
        {errors && errors.password && <span>{errors.password.message}</span>}

        <button type="submit">Entrar</button>
        <h3>Ainda não possui uma conta?</h3>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default FormCard;
