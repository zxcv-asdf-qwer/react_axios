import { GoogleOAuthProvider } from '@react-oauth/google'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>,
)
