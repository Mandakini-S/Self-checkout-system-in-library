import React, { useState } from "react";
import axios from 'axios';
import "./LoginPage.css"
import { useNavigate } from 'react-router-dom'

const LoginPage = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [authenticationError, setAuthenticationError] = useState('');
  const navigate = useNavigate()

  const onButtonClick = async () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
    setAuthenticationError('');

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    try {
      const response = await axios.post('/api/token/', { email, password });
      const { access, refresh } = response.data;

      // Store the access token securely (localStorage in this example)
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Navigate to the protected route (e.g., /adminhome)
      navigate('/adminhome');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setAuthenticationError('Invalid email or password. Please try again.');
      } else {
        setAuthenticationError('An error occurred. Please try again later.');
      }
    }
  };
  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          type="password"  // Set the input type to "password"
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />

        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default LoginPage