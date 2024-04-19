import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LogIn extends Component {
  state = {
    username: '',
    password: '',
    errorState: false,
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'

    const userDetals = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetals),
    }

    const apiData = await fetch(url, options)

    if (apiData.ok === true) {
      const {history} = this.props
      const jsonApiData = await apiData.json()
      const jwtToken = jsonApiData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorState: true})
    }
  }

  onChangeUserInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  getErrorAlert = () => {
    const {errorState} = this.state
    return errorState ? (
      <p className="error-para">*Username and password didnt matched</p>
    ) : (
      ''
    )
  }

  render() {
    const {username, password} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container d-flex">
        <div className="forms-container d-flex">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.submitForm} className="margin-top">
            <label htmlFor="username">USERNAME</label>
            <input
              value={username}
              className="home-input"
              placeholder="Username"
              id="username"
              type="text"
              onChange={this.onChangeUserInput}
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              value={password}
              className="home-input"
              placeholder="Password"
              id="password"
              type="password"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {this.getErrorAlert()}
          </form>
        </div>
      </div>
    )
  }
}

export default LogIn
