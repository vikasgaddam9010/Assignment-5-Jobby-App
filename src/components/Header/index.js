import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {IoBagHandleSharp} from 'react-icons/io5'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickToLogOut = () => {
    const {history} = props
    Cookies.remove('jwtToken')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="d-flex-header d-none-sm">
        <Link className="link" to="/">
          <p>Home</p>
        </Link>
        <Link className="link" to="/jobs">
          <p>Jobs</p>
        </Link>
      </div>
      <button
        type="button"
        onClick={onClickToLogOut}
        className="logout-btn d-none-sm"
      >
        Logout
      </button>
      <ul className="icons-container">
        <li>
          <Link className="link" to="/">
            <AiFillHome />
          </Link>
        </li>
        <li>
          <Link className="link" to="/jobs">
            <IoBagHandleSharp />
          </Link>
        </li>
        <li>
          <button className="btn-ioc-log-out" onClick={onClickToLogOut}>
            <FiLogOut />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
