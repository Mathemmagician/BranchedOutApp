import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TreeProvider } from './TreeContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TreeProvider>
      <App />
    </TreeProvider>
  </React.StrictMode>,
)
