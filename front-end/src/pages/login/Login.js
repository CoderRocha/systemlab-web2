import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// styles
import styles from './Login.module.css';
import Logo from '../../assets/Systemlab-logo.png';
import BackgroundImage from '../../assets/login-background.jpg';

function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!user || !password) {
            setError('Por favor, preencha todos os campos!');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: user,
                password: password
            });

            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/home');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao fazer login.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={styles['login-page']}
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <div className={styles['login-container']}>
                <form onSubmit={handleSubmit} className={styles['login-form']}>
                    <img src={Logo} alt="SystemLab Web Logo" className={styles['logo']} />
                    <h2>Bem vindo!</h2>
                    {error && <p className={styles.error}>{error}</p>}
                    <label>
                        <input
                            type="text"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            placeholder="Usuário"
                            required
                            autoFocus
                        />
                    </label>
                    <label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Senha"
                            required
                        />
                    </label>
                    <button 
                        type="submit" 
                        className={styles['btn']}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;