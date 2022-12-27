import { createBrowserRouter } from 'react-router-dom';
import { Root } from './routes/Root';
import ErrorPage from './ErrorPage';
import { HomePage } from './routes/HomePage';
import { LoginPage } from './routes/LoginPage';
import { Search } from './routes/Search';
export const router = createBrowserRouter([
    {
      path: '/',
      element: <Root/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: '/',
          element: <HomePage/>
        },
        {
          path: '/search',
          element: <Search/>,
        }
      ]
  
    },
    {
      path: '/login',
      element: <LoginPage/>,
    },
  ])