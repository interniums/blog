import { useRef, useState, useEffect } from 'react'
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
const EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
const REGISTER_URL = '/user'

export default function Registration() {
  const userRef = useRef()
  const errRef = useRef()
  const emailRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    console.log(result)
    console.log(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    console.log(result)
    console.log(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    console.log(result)
    console.log(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    const v3 = EMAIL_REGEX.test(email)
    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid entry.')
      return
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: pwd, email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(response.data)
      console.log(JSON.stringify(response))
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response.')
      } else if (err.response?.status === 409) {
        setErrMsg('Email taken.')
      } else {
        setErrMsg('Registrarion failed.')
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
            <Link to="login" className="underline text-blue-600 text-2xl">
              Login
            </Link>
          </div>
        </section>
      ) : (
        <main className="w-full h-screen flex justify-center items-center text-">
          <section className="border-slate-400 border rounded p-6 w-2/5 ">
            <p
              ref={errRef}
              className={errMsg ? 'errmsg' : 'offscreen'}
              aria-live="assertive"
              style={{ color: 'red', fontWeight: 'bold' }}
            >
              {errMsg}
            </p>
            <h1 className="underline">Register</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid mt-6">
                <label htmlFor="email">
                  Email:
                  <span className={validEmail ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validEmail || !email ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  className="border border-slate-400 rounded px-2"
                  type="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={validEmail ? 'false' : 'true'}
                  aria-describedby="emailnote"
                  required
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? 'instructions'
                      : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  The email couldn't start or finish with a dot.
                  <br />
                  The email shouldn't contain spaces into the string.
                  <br />
                  The email shouldn't contain special chars.
                </p>
              </div>

              <div className="grid mt-6">
                <label htmlFor="username">
                  Username:
                  <span className={validName ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validName || !user ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  className="border border-slate-400 rounded px-2"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  aria-invalid={validName ? 'false' : 'true'}
                  aria-describedby="uidnote"
                  required
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? 'instructions'
                      : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>

              <div className="grid mt-4">
                <label htmlFor="password">
                  Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? 'hide' : 'invalid'}
                  />
                </label>
                <input
                  className="border border-slate-400 rounded px-2"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? 'instructions' : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters and a number.
                  <br />
                  Allowed special characters:{' '}
                  <span aria-label="exclamation mark">!</span>{' '}
                  <span aria-label="at symbol">@</span>{' '}
                  <span aria-label="hashtag">#</span>{' '}
                  <span aria-label="dollar sign">$</span>{' '}
                  <span aria-label="percent">%</span>
                </p>
              </div>

              <div className="grid mt-4">
                <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPwd ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMatch || !matchPwd ? 'hide' : 'invalid'}
                  />
                </label>
                <input
                  className="border border-slate-400 rounded px-2"
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? 'false' : 'true'}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? 'instructions' : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  Must match the first password input field.
                </p>
              </div>
              <button
                disabled={!validName || !validPwd || !validMatch ? true : false}
                className="border rounded border-slate-400 mt-4 py-1 px-6 w-max"
              >
                Sign up
              </button>
              <div className="grid mt-4">
                <p>
                  Already registered? <br />
                  <span className="line">
                    <Link to="login" className="underline text-blue-400">
                      Login
                    </Link>
                  </span>
                </p>
              </div>
            </form>
          </section>
        </main>
      )}
    </>
  )
}
