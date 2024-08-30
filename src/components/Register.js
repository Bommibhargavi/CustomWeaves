import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/Authslice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { userReg, loading, error } = useSelector((state) => state.auth);
  const navigate=useNavigate()

  useEffect(()=>{
    if(userReg)
      {
        navigate("/login");
      }
  },[userReg])
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, password, email,address:null, favorites: [], cart: [],CustomDesigns:[], orders:[] };
    dispatch(registerUser(newUser));
    
  };

  return (
    <div className='formContainer'>
      <h2>Register</h2>
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
        <div class="form-floating mb-3">
          <input type="email"
            className="form-control"
            id="floatingInput"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="floatingInput">Email</label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {userReg && <p style={{color:"#3cb043"}}>Registration successful! Welcome, {userReg.username}!</p>}
    </div>
  );
};

export default Register;
