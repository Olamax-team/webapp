import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PasswordRecovery from './pages/PasswordRecovery';


const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <App/>
      },
      {
        path: '/log-in',
        element: <LoginPage/>
      },
      {
        path: '/sign-up',
        element: <SignUpPage/>
      },
      {
        path: '/password-recovery',
        element: <PasswordRecovery/>
      },
    ]
  }
]); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
