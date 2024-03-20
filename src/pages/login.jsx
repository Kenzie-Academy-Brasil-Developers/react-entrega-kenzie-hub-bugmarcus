import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../public/Logo.svg";
import { Link, useNavigate } from "react-router-dom";

const FormCard = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      await axios.post("https://kenziehub.herokuapp.com/sessions", data);
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro no login: Verifique seu email e senha.");
    }
  };

  return (
    <div>
      <img src={Logo} alt="Kenzie Hub Logo" />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          id="email"
          {...register("email", { required: "Campo obrigatório" })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Campo obrigatório" })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit">Entrar</button>
        <Link to="/register">Ainda não possui uma conta?</Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormCard;
