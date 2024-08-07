import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'

const LOGIN_URL = '/login'

export default function Login() {
  const { setAuth } = useAuth()
  const emailRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState('')
  // console.log(email, pwd)

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken
      const admin = response?.data?.admin
      setAuth({ email, pwd, admin, accessToken })
      setEmail('')
      setPwd('')
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response.')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing input data.')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthoraized.')
      } else {
        setErrMsg('Login failed.')
      }
      errRef.current.focus()
    }
  }

  return (
    <>
      {success ? (
        <section className="w-full h-screen flex justify-center p-24">
          <div className="bg-slate-300 p-8 border rounded h-max">
            <h1 className="text-4xl">Success!</h1>
            <Link to="/" className="underline text-blue-600 text-2xl">
              Home
            </Link>
          </div>
        </section>
      ) : (
        <main className="w-full h-screen flex justify-center items-center">
          <section className="border-slate-400 border rounded p-6 w-2/5 ">
            <p
              ref={errRef}
              className={errMsg ? 'errmsg' : 'offscreen'}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="underline">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid mt-6">
                <label htmlFor="email">Email:</label>
                <input
                  className="border border-slate-400 rounded px-2"
                  type="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="grid mt-6">
                <label htmlFor="email">Password:</label>
                <input
                  className="border border-slate-400 rounded px-2"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </div>
              <button className="border rounded border-slate-400 mt-6 py-1 px-6 w-max">
                Sign in
              </button>
              <div className="grid mt-6">
                <p>Need an account?</p>
                <Link className="underline text-blue-400" to="registration">
                  Sign-up
                </Link>
              </div>
            </form>
          </section>
        </main>
      )}
    </>
  )
}
