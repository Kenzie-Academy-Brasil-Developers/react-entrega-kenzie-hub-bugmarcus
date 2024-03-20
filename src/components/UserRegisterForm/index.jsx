import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const signupSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
    bio: z.string().min(1, "Bio é obrigatória"),
    contact: z.string().min(1, "Contato é obrigatório"),
    course_module: z.string().min(1, "Módulo do curso é obrigatório"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

const FormCard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      await axios.post("https://kenziehub.herokuapp.com/users", userData);
      toast.success("Registro feito com sucesso!");
      reset();
    } catch (error) {
      console.error(error.response.data);
      if (error.response && error.response.data) {
        setError("apiError", {
          type: "manual",
          message: error.response.data.message,
        });
        toast.error(`Erro no registro: ${error.response.data.message}`);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nome:</label>
        <input id="name" type="text" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}

        <label htmlFor="email">E-mail:</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="password">Senha:</label>
        <input id="password" type="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}

        <label htmlFor="confirmPassword">Confirmar senha:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}

        <label htmlFor="bio">Bio:</label>
        <input id="bio" type="text" {...register("bio")} />
        {errors.bio && <span>{errors.bio.message}</span>}

        <label htmlFor="contact">Contato:</label>
        <input id="contact" type="text" {...register("contact")} />
        {errors.contact && <span>{errors.contact.message}</span>}

        <label htmlFor="course_module">Módulo do curso:</label>
        <select id="course_module" {...register("course_module")}>
          <option value="Primeiro módulo (Introdução ao Frontend)">
            Primeiro módulo (Introdução ao Frontend)
          </option>
          <option value="Segundo módulo (Frontend Avançado)">
            Segundo módulo (Frontend Avançado)
          </option>
          <option value="Terceiro módulo (Introdução ao Backend)">
            Terceiro módulo (Introdução ao Backend)
          </option>
          <option value="Quarto módulo (Backend Avançado)">
            Quarto módulo (Backend Avançado)
          </option>
        </select>
        {errors.course_module && <span>{errors.course_module.message}</span>}

        {errors.apiError && <span>{errors.apiError.message}</span>}

        <button type="submit">Registrar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormCard;
