import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Root } from "../routes/Root";

//Receives context from AuthProvider 
//in order to render login or homePage depending if a user exists
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