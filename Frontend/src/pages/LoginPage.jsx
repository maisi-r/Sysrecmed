import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from "../context/AuthContext";

function LoginPage() {

  const { register, handleSubmit, formState :{ errors }} = useForm();
  const { signin, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  })

  return (

    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
    

      

      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      {
        signinErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 text-white">
            {error}
          </div>
        ))
      }
      <h1 className='text-2xl font-bold'> Login </h1>
      <form onSubmit={onSubmit}>

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

        <button type="submit">Login</button>
      </form>
      </div>
    </div>
  )
}

export default LoginPage

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useAuth } from '../context/AuthContext';

// function LoginPage() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const { signin, errors: signinErrors } = useAuth();
//   const [loginError, setLoginError] = useState('');

//   const onSubmit = handleSubmit(async (data) => {
//     const { email, password } = data;
//     if (email === 'maximiliano' && password === 'maximiliano') {
//       try {
//         await signin(data);
//         window.location.href = '/record'; // Redirige al usuario a la página de registro
//       } catch (error) {
//         setLoginError(error.message);
//       }
//     } else {
//       setLoginError('Nombre de usuario o contraseña incorrectos');
//     }
//   });

//   return (
//     <div className="flex h-[calc(100vh-100px)] items-center justify-center">
//       <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
//         {loginError && (
//           <div className="bg-red-500 p-2 text-white">
//             {loginError}
//           </div>
//         )}
//         <h1 className='text-2xl font-bold'>Login</h1>
//         <form onSubmit={onSubmit}>
//           <input
//             className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
//             type="text"
//             {...register("email", { required: true })}
//             placeholder="Username"
//           />
//           <input
//             className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
//             type="password"
//             {...register("password", { required: true })}
//             placeholder="Password"
//           />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;