import { Link } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
// import styles from '../styles/HomePage.module.css'

export default function HomePage() {
  return (
    <div className="w-screen">
      <Header />
      <Main />
    </div>
  )
}
