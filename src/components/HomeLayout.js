import { Navigate, useOutlet } from "react-router-dom";
import { LoginPage } from "../routes/LoginPage";
import { useAuth } from "../hooks/useAuth";
//Receives context from AuthProvider 
//in order to render login or homePage depending if a user exists
export const HomeLayout = () => {
  const { token } = useAuth();
  const outlet = useOutlet();

  if (token && token.isNotExpired) {
    console.log(token.expires_in)
    return <Navigate to="/homepage" replace />;
  }

  return (
    <div>
      <LoginPage/>
      {outlet}
    </div>
  );
};