import { createContext, useContext, useState } from "react";
import { registerRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[IsAuthenticated, setIsAuthenticated] = useState(false)

  const signup = async (user) => {
    console.log("Submitting...", user);
    try {
      const res = await registerRequest(user);
      console.log("Registration successful:", res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error during registration:", error);
      // Maneja el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario.
    }
  };

  return (
    <AuthContext.Provider value={{
      signup,
      user,
      IsAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
