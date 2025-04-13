import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import styles from './Login.module.css';
import Logo from '../../assets/Systemlab-logo.png';
import BackgroundImage from '../../assets/login-background.jpg';

function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        navigate('/home');
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
                        <button type="submit" className={styles['btn']}>Entrar</button>
                    </form>
                </div>
            </div>
    );
}

export default Login;