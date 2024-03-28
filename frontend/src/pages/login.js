import { useState } from 'react';




const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('password');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = () => {
        if ((username.toLowerCase() === 'admin' && password === 'CSCuser1?123')
            || (username.toLowerCase() === 'anna' && password === 'anna123')
            || (username.toLowerCase() === 'nasir' && password === 'nasir123')
            || (username.toLowerCase() === 'sheriar' && password === 'Sheriar?123')
            || (username.toLowerCase() === 'yasir' && password === 'yasir123')
            ) {
            // Login successful
            window.location.href = '/main/' + username; // Replace '/some-page' with the desired page URL
            setSuccessMessage('Login successful');
        } else {
            setError('Invalid username or password');
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    }
    const handleToggle = () => {
        if (type === 'password') {
            setType('text')
        } else {
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
