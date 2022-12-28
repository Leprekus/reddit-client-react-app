import { Navigate, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Root } from "../routes/Root";
//Receives context from AuthProvider 
//in order to render login or homePage depending if a user exists
 export const HomeLayout = () => {
  const outlet = useOutlet();
  const currentUser = useSelector(selectCurrentUser)
 
  return  currentUser ? <Navigate to='homepage'/> :
    <div>
    <Root/>
      { outlet }
    </div>
  ;
};