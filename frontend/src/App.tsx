import './App.css'
import { Routes } from './app/routes/routes'

import { API_URL } from './config'
function App() {

  console.log('api', API_URL)
  return (
    <Routes />
  )
}

export default App
