import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom' 

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {signup, isAuthenticated} = useAuth()
  const useNavigate = useNavigate()


  useEffect(() => {
    if(isAuthenticated) navigate('/record');
  },[isAuthenticated])

  console.log(user);

  const onSubmit = async (values) => {
    try {
      signup(values);
    } catch (error) {
      console.error("Error during registration:", error);

      // Aquí puedes mostrar un mensaje de error al usuario.
      // Por ejemplo: setErrorMessage("Error en el registro. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
          
        />
        {errors.username && <p className="text-red-500">Username is required</p>}

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
        {errors.password && <p className="text-red-500">Password is required</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
