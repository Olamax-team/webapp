import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navigation from './components/navigation/Navigation.tsx'
import Footer from './components/footer/Footer.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <Navigation/>
      <RouterProvider router={router}/>
      <Footer/>
    </>
  </StrictMode>,
)
