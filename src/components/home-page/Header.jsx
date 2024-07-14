import { Link } from 'react-router-dom'
import Login from '../auth/Login'

export default function Header() {
  return (
    <div className="header__container py-6 shadow-lg">
      <header>
        <div>
          <h1 className="text-center text-4xl">Simply Blog</h1>
        </div>
        <div className="w-full mt-8">
          <nav className="flex justify-center gap-32">
            <Link>
              <button className="hover:opacity-40 ease-in-out duration-300">
                HOME
              </button>
            </Link>
            <Link>
              <button className="hover:opacity-40 ease-in-out duration-300">
                CATEGORIES
              </button>
            </Link>
            <Link>
              <button className="hover:opacity-40 ease-in-out duration-300">
                CONTACT
              </button>
            </Link>
            <Link to="login">
              <button className="hover:opacity-40 ease-in-out duration-300">
                LOGIN
              </button>
            </Link>
          </nav>
        </div>
      </header>
    </div>
  )
}
