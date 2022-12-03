import { createBrowserRouter } from 'react-router-dom';
import { Root } from './routes/Root';
import ErrorPage from './ErrorPage';
import { HomePage } from './routes/HomePage';
import { ProtectedLayout } from './components/ProtectedLayout';
import { LoginPage } from './features/login/LoginPage';
import { AuthProvider } from './hooks/useAuth';
export const router = createBrowserRouter([
    {
      path: '/',
      element: 
      <AuthProvider>
        <ProtectedLayout/>
      </AuthProvider>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: 'homePage',
          element: <HomePage/>
        }
      ]
  
    },
    {
      path: '/login',
      element: 
      <AuthProvider>
        <LoginPage/>
      </AuthProvider>
    }
  ])