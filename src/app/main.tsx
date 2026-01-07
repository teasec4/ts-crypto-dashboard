import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RootPage from '../pages/RootPage'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootPage/>
  </StrictMode>,
)
