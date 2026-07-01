import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position='top-right' toastOptions={{
        error: {
          style: {
            background: '#ef4444',
            color: "#fff",
            border: "1px solid #7f1d1d"
          },
        },
        success: {
          style: {
            background: '#22c55e',
            color: '#fff'
          },
        },
      }} />
    </Provider>
  </StrictMode>,
)
