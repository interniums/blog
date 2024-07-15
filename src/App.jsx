import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/home-page/HomePage'
import Login from './components/auth/Login'
import Create from './components/Create'
import CreateCategory from './components/CreateCategory'
import Registration from './components/auth/Registration'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="category">
          <Route index element="" />
          <Route path="category/:id" element="" />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="profile" element="" />
          <Route path="create">
            <Route index element={<Create />} />
            <Route path="category" element={<CreateCategory />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
