import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import Login from './components/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element="" />
        <Route path="category" element="">
          <Route path="category/:id" element="" />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
