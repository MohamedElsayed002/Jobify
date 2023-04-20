import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'normalize.css'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AppProvider } from './context/appContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppProvider>
      <App/>
    </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
