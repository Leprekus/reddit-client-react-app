import { createBrowserRouter } from 'react-router-dom';
import { Root } from './routes/Root';
import ErrorPage from './ErrorPage';
import { HomePage } from './routes/HomePage';

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Root/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: 'homePage',
          element: <HomePage/>
        }
      ]
  
    },
  ])