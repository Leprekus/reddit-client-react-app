import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Root } from "../routes/Root";
import { ThemeProvider } from '@mui/material'
import theme from '../theme/theme';

//Receives context from AuthProvider 
//in order to render login or homePage depending if a user exists
export const ProtectedLayout = () => {
  const { token } = useAuth();
  const outlet = useOutlet();

  if (!token || token.isExpired) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Root/>
        <ThemeProvider theme={theme}>
          { outlet }
        </ThemeProvider>
    </div>
  )
};