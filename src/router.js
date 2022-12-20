import { createBrowserRouter } from 'react-router-dom';
import { Root } from './routes/Root';
import ErrorPage from './ErrorPage';
import { HomePage } from './routes/HomePage';
import { LoginPage } from './routes/LoginPage';
import { TestComponent } from './mocks/TestRequests';
export const router = createBrowserRouter([
    {
      path: '/',
      element: <Root/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: '/',
          element: <HomePage/>
        }
      ]
  
    },
    {
      path: '/login',
      element: <LoginPage/>,
    }
  ])