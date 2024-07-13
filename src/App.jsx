import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/home-page/HomePage'
import Login from './components/Login'
import Create from './components/Create'

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
        <Route path="create" element={<Create />} />
      </Route>
    </Routes>
  )
}

export default App
