import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './accessibility.css'
import App from './App.tsx'

// Ensure we have a valid root element and provide helpful error if not
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Failed to find the root element. Please check your HTML.');
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
