import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authenticationError, setAuthenticationError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Reset error messages
    setEmailError('');
    setPasswordError('');
    setAuthenticationError('');

    // Check if the user has entered both fields correctly
    if (email.trim() === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (password.trim() === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

  

    if (email === 'admin@gmail.com' && password === 'admin521774') {
      // Navigate to /adminhome for admin user
      navigate('/adminhome');

    } else {
      // Handle authentication error
      setAuthenticationError('Incorrect email or password');
    }
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Admin Login</div>
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
        <input className={'inputButton'} type="button" onClick={handleLogin} value={'Log in'} />
      </div>
      {authenticationError && <div className="errorLabel">{authenticationError}</div>}
    </div>
  );
};

export default LoginPage;
