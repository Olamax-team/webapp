import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PasswordRecovery from './pages/PasswordRecovery';
import Dashboard from './pages/Dashboard';
import BillPayment from './pages/BillPayment';
import Transaction from './pages/Transaction';
import IdentityVerification from './pages/IdentityVerification';
import AccountManagement from './pages/AccountManagement';
import MyReward from './pages/MyReward';
import NewsAnnouncement from './pages/NewsAnnouncement';


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
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/dashboard/bills_payment',
        element: <BillPayment/>
      },
      {
        path: '/dashboard/transaction',
        element: <Transaction/>
      },
      {
        path: '/dashboard/identity_verification',
        element: <IdentityVerification/>
      },
      {
        path: '/dashboard/account_management',
        element: <AccountManagement/>
      },
      {
        path: '/dashboard/my_rewards',
        element: <MyReward/>
      },
      {
        path: '/new-announcement',
        element: <NewsAnnouncement/>
      },
     

    ]
  }
]); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
