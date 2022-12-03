import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Root } from "../routes/Root";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Root/>
      { outlet }
    </div>
  )
};