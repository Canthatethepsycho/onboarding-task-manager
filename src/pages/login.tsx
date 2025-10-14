import { useState } from 'react';





function Login() {

    const[username, setUsername] = useState('');  
    const[password, setPassword] = useState('');  

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt:', { username, password });
      };



return (

<div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="username">Benutzername:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Passwort:</label>
          <input type="password" id="password" value={password} onChange={(e) =>   setPassword(e.target.value)}/>
        </div>
        <button type="submit">Einloggen</button>
      </form>
    </div>
  );
}

export default Login;
