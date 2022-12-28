import { createBrowserRouter } from 'react-router-dom';
import { Root } from './routes/Root';
import ErrorPage from './ErrorPage';
import { HomePage } from './routes/HomePage';
import { Search } from './routes/Search';
import { Subreddit } from './routes/Subreddit';
import { HomeLayout} from './components/HomeLayout'
export const router = createBrowserRouter([
  //change format to carousel 
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
        },
        {
          path: '/r/:subreddit',
          element: <Subreddit/>,
        },
      ]
    },
   
  ])