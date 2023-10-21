import React from 'react'

import './App.css'
import { SignUpPage } from './pages/SignUpPage/SignUpPage'

const rootContainerClassName = 'root-container'

const App = () => {
  return (
    <div className={rootContainerClassName}>
      <SignUpPage />
    </div>
  )
}

export default App
