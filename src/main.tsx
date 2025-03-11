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
import AboutUs from './components/aboutUs/aboutUs';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Education from './components/educationalCenter/education';
import OlamaxFoundationPage from './pages/OlamaxFoundationPage';
import ModuleOne from './components/educationalCenter/moduleOne';
import { ReferralPrograme } from './components/referralPage/referralProgram';
import Escrow from './components/escrow/escrow';
import OTC from './components/OTC/otc';
import SupportPage from './pages/SupportPage';
import PrivacyPolicy from './components/privacy/privacyPolicy';


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
        path: '/about-us',
        element: <AboutUs/>
      },
      {
        path:'/privacy',
        element:  <PrivacyPolicy/>

      },
      {
        path: '/educational-center',
        element: <Education/>
      },
      {
        path:'/moduleOne',
        element: <ModuleOne/>
      },
      {
          path:'/referral-program',
          element: <ReferralPrograme/>
      },
      {
        path: '/escrow-services',
        element:  <Escrow/>

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
        path: '/news-and-announcement',
        element: <NewsAnnouncement/>
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute><Dashboard/></ProtectedRoute>
      },
      {
        path: '/dashboard/bills_payment',
        element: <ProtectedRoute><BillPayment/></ProtectedRoute>
      },
      {
        path: '/dashboard/transaction',
        element: <ProtectedRoute><Transaction/></ProtectedRoute>
      },
      {
        path: '/dashboard/identity_verification',
        element: <ProtectedRoute><IdentityVerification/></ProtectedRoute>
      },
      {
        path: '/dashboard/account_management',
        element: <ProtectedRoute><AccountManagement/></ProtectedRoute>
      },
      {
        path: '/dashboard/my_rewards',
        element: <ProtectedRoute><MyReward/></ProtectedRoute>
      },
      {
        path: '/olamax-foundation',
        element: <OlamaxFoundationPage/>
      },
      {
        path: '/otc-desk',
        element: <OTC/>
      },
      {
        path: '/support',
        element: <SupportPage/>
      },
    ]
  }
]); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
