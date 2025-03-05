import React from 'react'
import ReactDOM from 'react-dom/client'
import TimeComponent from './components/appTime.jsx'


ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <>
     <TimeComponent></TimeComponent>
    </>
  </React.StrictMode>,
)
