import { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isLogged = () => {
        setIsLoggedIn(true);
    };
    const handleLogin = () => {
        if (username === 'admin' && password === 'CSCuser1?123') {
            // Login successful
            window.location.href = '/main'; // Replace '/some-page' with the desired page URL
            setSuccessMessage('Login successful');
            isLogged();
        } else {
            setError('Invalid username or password');
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    }
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }
    return (
        <div className='login-form-container'>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input
                type={type}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
            />
            <div>
                <button style={{ marginRight: '10px' }} onClick={handleToggle}>Show Password</button>
                <button onClick={handleLogin}>Login</button>
            </div>

            {error && <div className='error'>{error}</div>}
            {successMessage && <div className='success'>{successMessage}</div>}
        </div>

    )
}
export default Login;
