import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username,password) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();


      if (!res.ok) {
        throw new Error(data.error);
      }
      setAuthUser(data);
    } catch (error) {
        const errorMessage = error.message || "Login failed. Please try again.";
        toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
