import { createBrowserRouter } from 'react-router-dom';
import { Root } from './routes/Root';
import ErrorPage from './ErrorPage';
import { HomePage } from './routes/HomePage';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
    {
      path: '/',
      element: 
      <ProtectedRoute>
        <Root/>
      </ProtectedRoute>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: 'homePage',
          element: <HomePage/>
        }
      ]
  
    },
  ])