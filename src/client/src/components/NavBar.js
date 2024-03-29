import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faBars,
  faCircleUser,
  faHome,
  faListAlt,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { Button, Input } from './'
import NetflizLogo from '../assets/images/pink2-logo.png'
import axios from 'axios'
const NavBar = ({ allowSearch = true }) => {
  const [isLogin, setIsLogin] = React.useState(false)
  const navigate = useNavigate()
  const [showLinks, setShowLinks] = React.useState(false)
  const [textInput, setTextInput] = React.useState('')
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  const [admin, setAdmin] = React.useState(false)

  const toggleLinks = () => {
    setShowLinks(!showLinks)
    navigate({
      pathname: '/profile',
    })
  }

  const submit = (e) => {
    navigate({
      pathname: '/videos/search',
      search: `?name=${textInput}`,
    })
  }

  const navButton = () => {
    setNavbarOpen(!navbarOpen)
  }

  React.useEffect(() => {
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token') !== 'null'
    ) {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}users/authen`, {
          token: localStorage.getItem('token'),
        })
        .then((resa) => {
          console.log(resa.permission)
          if (resa.data.permission === 'not') {
            localStorage.removeItem('token')
            setIsLogin(false)
          } else {
            if (resa.data.permission === true) {
              setAdmin(true)
            }
            setIsLogin(true)
          }
        })
    }
  }, [localStorage])

  return (
    <div className="fixed top-0 overflow-hidden w-full z-10">
      <div className="flex flex-row justify-between bg-black bg-opacity-75">
        <div className="flex items-center w-full pl-2">
          <button className="hidden max-[800px]:block" onClick={navButton}>
            <FontAwesomeIcon
              icon={faBars}
              className="text-[30px] cursor-pointer text-white hover:text-[#CD0574]"
            />
          </button>
          <img
            src={NetflizLogo}
            className="logo w-[140px] max-[800px]:hidden max-w-none cursor-pointer"
            alt="logo"
            onClick={() => navigate({ pathname: '/' })}
          />

          <Button
            theme={
              'bg-opacity-100 mb-2 mt-3 text-2xl max-[800px]:hidden font-button text-[#CD0574]'
            }
            onClick={() => navigate({ pathname: '/categories' })}
          >
            Category
          </Button>

          {allowSearch === true && (
            <form
              onSubmit={submit}
              className="flex mr-10 max-w-screen-md w-full ml-auto max-[800px]:hidden"
            >
              <Input
                inputTheme="p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 "
                placeholder="Input movie name or category"
                containerTheme="pt-2 mb-2 w-full bg-opacity-25"
                textColor={'white'}
                name="name"
                onChange={(e) => setTextInput(e.target.value)}
              ></Input>
              <Button
                type="submit"
                onClick={submit}
                theme="mt-2 w-14 rounded-full ml-0"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} inverse size="2x" />
              </Button>
            </form>
          )}
        </div>

        {isLogin === false ? (
          <div className="flex flex-row">
            <Button
              theme={
                'bg-gray-200 p-1 my-2 mr-5 w-20 rounded-md text-2xl font-button text-[#CD0574]'
              }
              onClick={() => navigate({ pathname: '/login' })}
            >
              LOGIN
            </Button>
            <Button
              theme={
                'bg-[#CD0574] p-1 my-2 mr-5 w-20 rounded-md text-2xl font-button text-gray-200'
              }
              onClick={() => navigate({ pathname: '/signup' })}
            >
              SIGNUP
            </Button>
          </div>
        ) : isLogin === true ? (
          <div className="flex flex-row mr-2">
            {admin === true ? (
              <Button
                theme={
                  'bg-[#CD0574] p-1 my-2 mr-5 w-20 rounded-md text-2xl font-button text-gray-200'
                }
                onClick={() => {
                  navigate({ pathname: '/admin' })
                }}
              >
                Admin
              </Button>
            ) : (
              <div></div>
            )}

            <button className="nav-toggle" onClick={toggleLinks}>
              <FontAwesomeIcon icon={faCircleUser} inverse size="2x" />
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <ul
        className={`menu-nav w-full ${
          navbarOpen ? 'max-[800px]:show-menu' : 'hidden'
        }`}
      >
        <li className="menu-item">
          <div className="flex space-x-2 items-center">
            <FontAwesomeIcon icon={faHome} inverse size="1x" />
            <a href="/">Home</a>
          </div>
        </li>
        <li className="menu-item">
          <div className="flex space-x-2 items-center">
            <FontAwesomeIcon icon={faListAlt} inverse size="1x" />
            <a href="/categories">Category</a>
          </div>
        </li>
        <li className="menu-item">
          <form className="flex space-x-4 items-center" onSubmit={submit}>
            <input
              className="w-fit min-h-[2rem] text-black"
              placeholder="Search ..."
              name="name"
              onChange={(e) => setTextInput(e.target.value)}
            />
            <button type="submit" onClick={submit}>
              <FontAwesomeIcon icon={faSearch} inverse size="1x" />
            </button>
          </form>
        </li>
      </ul>
    </div>
  )
}
export { NavBar }
