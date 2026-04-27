import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetch("http://localhost:5000/api/notes", {
          credentials: "include",
        });
      } catch {
        window.location.href = "/";
      }
    };

    checkAuth();
  }, []);

  return children;
}