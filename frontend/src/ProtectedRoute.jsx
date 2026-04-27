import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetch("https://private-notes-app-1-6q2h.onrender.com/api/notes", {
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