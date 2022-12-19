import { Navigate, useOutlet } from "react-router-dom";
import { LoginPage } from "../routes/LoginPage";
import { useAuth } from "../hooks/useAuth";
//Receives context from AuthProvider 
//in order to render login or homePage depending if a user exists
 const HomeLayout = () => {
  const { token } = useAuth();
  const outlet = useOutlet();

  if (token && !token.isExpired) {
    return <Navigate to="/homepage" replace />;
  }

  return (
    <div>
      <LoginPage/>
      {outlet}
    </div>
  );
};