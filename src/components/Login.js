import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/Authslice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");

    }
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));

  };

  return (
    <div className='formContainer'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>


        <div class="form-floating mb-3">
          <input type="text"
            className="form-control"
            id="floatingInput"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label for="floatingInput">username</label>
        </div>

        <div class="form-floating mb-3">
          <input type="password"
            className="form-control"
            id="floatingInput"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="floatingInput">Password</label>
        </div>


        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      {error && <p className='errorMessage'>{error}</p>}
      {user && <p>Welcome back, {user.username}!</p>}
      <p>Don't have account? <Link to='/Register' className='link'>Register</Link></p>
    </div>
  );
};

export default Login;
