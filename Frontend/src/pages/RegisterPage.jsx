// RegisterPage.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signup(values);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  });

  useEffect(() => {
    // Verificar si el usuario ya está autenticado al montar el componente
    if (isAuthenticated) {
      navigate("/record");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {
        registerErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 text-white">
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500">Username is required</p>
        )} 

        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">Password is required</p>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
